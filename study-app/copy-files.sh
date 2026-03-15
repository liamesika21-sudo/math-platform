#!/bin/bash

# Copy existing files into the app's files directory

SOURCE_DIR="/Users/liamesika/Desktop/infi"
TARGET_DIR="/Users/liamesika/Desktop/infi/study-app/files"

echo "Copying PDF files to: $TARGET_DIR"
echo ""

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Counter
COUNT=0

# Copy from lecture directory
if [ -d "$SOURCE_DIR/lecture" ]; then
  echo "Copying from lecture..."
  shopt -s nullglob
  for file in "$SOURCE_DIR/lecture"/*.pdf; do
    if [ -f "$file" ]; then
      cp "$file" "$TARGET_DIR/"
      COUNT=$((COUNT + 1))
      echo "  ✓ $(basename "$file")"
    fi
  done
fi

# Copy from recitation directory
if [ -d "$SOURCE_DIR/recitation" ]; then
  echo "Copying from recitation..."
  for file in "$SOURCE_DIR/recitation"/*.pdf; do
    if [ -f "$file" ]; then
      cp "$file" "$TARGET_DIR/"
      COUNT=$((COUNT + 1))
      echo "  ✓ $(basename "$file")"
    fi
  done
fi

# Copy from hw directory
if [ -d "$SOURCE_DIR/hw" ]; then
  echo "Copying from hw..."
  for file in "$SOURCE_DIR/hw"/*.pdf; do
    if [ -f "$file" ]; then
      cp "$file" "$TARGET_DIR/"
      COUNT=$((COUNT + 1))
      echo "  ✓ $(basename "$file")"
    fi
  done
fi

echo ""
echo "Done! Copied $COUNT files."
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000/library"
echo "2. Click 'Scan' to detect files"
echo "3. Click 'Process All Files' to extract content"
