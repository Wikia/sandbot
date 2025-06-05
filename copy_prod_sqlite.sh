#!/usr/bin/env bash
#
# copy_sandbot.sh
#
# Finds the first pod in namespace "dev" (context "kube-sjc-dev") whose name
# contains "sandbot", then copies /usr/sandbot/sandbot.sqlite from that pod
# to a local file. The local destination path can be passed as an argument;
# it defaults to ./sandbot-prod.sqlite if not provided.
#

set -euo pipefail

DEFAULT_DEST="./sandbot-prod.sqlite"

usage() {
  cat <<EOF
Usage: ${0##*/} [DEST_PATH]

If DEST_PATH is not specified, defaults to ${DEFAULT_DEST}.

Examples:
  ${0##*/}
  ${0##*/} ./data.sqlite
EOF
  exit 1
}

if [[ "${1-}" == "-h" || "${1-}" == "--help" ]]; then
  usage
fi

if [[ "$#" -gt 1 ]]; then
  echo "Error: Too many arguments." >&2
  usage
fi

DEST_PATH="${1:-$DEFAULT_DEST}"

KUBE_CONTEXT="kube-sjc-dev"
NAMESPACE="dev"
SEARCH_PATTERN="sandbot"

pod_name=$(
  kubectl get pods \
    --context="${KUBE_CONTEXT}" \
    --namespace="${NAMESPACE}" \
    --no-headers \
  | grep "${SEARCH_PATTERN}" \
  | awk '{print $1}' \
  | head -n 1
)

if [[ -z "$pod_name" ]]; then
  echo "Error: No pod found matching pattern \"${SEARCH_PATTERN}\" in namespace \"${NAMESPACE}\" (context \"${KUBE_CONTEXT}\")" >&2
  exit 2
fi

echo "Found pod: ${pod_name}"

echo "Copying /usr/sandbot/sandbot.sqlite from pod ${pod_name} to ${DEST_PATH}..."
kubectl cp \
  --context="${KUBE_CONTEXT}" \
  "${NAMESPACE}/${pod_name}:/usr/sandbot/sandbot.sqlite" \
  "${DEST_PATH}"

echo "Done. File saved to ${DEST_PATH}."
