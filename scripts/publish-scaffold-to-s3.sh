#!/usr/bin/env bash
# Build react-vite tarball from this repo and upload to the layout TemplatesService expects:
#   s3://$S3_BUCKET/$PREFIX/$NAME/$VERSION/$NAME-$VERSION.tar.gz
#   s3://$S3_BUCKET/$PREFIX/$NAME/$VERSION/manifest.json
#   s3://$S3_BUCKET/$PREFIX/$NAME/latest.json
#
# Defaults match jarvis-backend + your bucket (override with env).
# Requires: aws CLI v2, authenticated (e.g. aws sso login --profile …).
#
# Usage (from repo root):
#   ./scripts/publish-scaffold-to-s3.sh
#   S3_BUCKET=jarvis-projects AWS_REGION=eu-west-3 ./scripts/publish-scaffold-to-s3.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NAME="$(node -p "require('./manifest.json').name")"
VERSION="$(node -p "require('./manifest.json').version")"
ARCHIVE="${NAME}-${VERSION}.tar.gz"

S3_BUCKET="${S3_BUCKET:-jarvis-projects}"
AWS_REGION="${AWS_REGION:-eu-west-3}"
PREFIX="${JARVIS_SCAFFOLD_S3_PREFIX:-jarvis-scaffold}"

echo "Publishing ${NAME}@${VERSION} → s3://${S3_BUCKET}/${PREFIX}/${NAME}/ … (${AWS_REGION})"

TMP_ARCHIVE="$(mktemp -t "${ARCHIVE%.tar.gz}.XXXXXX.tar.gz")"
trap 'rm -f "$TMP_ARCHIVE" latest.json.tmp 2>/dev/null || true' EXIT

tar -czf "$TMP_ARCHIVE" \
  --exclude='./.git' \
  --exclude='./node_modules' \
  --exclude='./dist' \
  --exclude='./.github' \
  .

DEST_PREFIX="s3://${S3_BUCKET}/${PREFIX}/${NAME}/${VERSION}"
aws s3 cp "$TMP_ARCHIVE" "${DEST_PREFIX}/${ARCHIVE}" \
  --region "${AWS_REGION}" \
  --content-type application/gzip \
  --cache-control "public, max-age=31536000, immutable"

aws s3 cp manifest.json "${DEST_PREFIX}/manifest.json" \
  --region "${AWS_REGION}" \
  --content-type application/json \
  --cache-control "public, max-age=31536000, immutable"

echo "{\"stable\":\"${VERSION}\"}" > latest.json.tmp
aws s3 cp latest.json.tmp "s3://${S3_BUCKET}/${PREFIX}/${NAME}/latest.json" \
  --region "${AWS_REGION}" \
  --content-type application/json \
  --cache-control "public, max-age=60"

echo "Done. Keys:"
echo "  s3://${S3_BUCKET}/${PREFIX}/${NAME}/latest.json"
echo "  ${DEST_PREFIX}/${ARCHIVE}"
echo "  ${DEST_PREFIX}/manifest.json"
