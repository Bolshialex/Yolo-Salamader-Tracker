"""Run inference on a single image with the trained YOLO model."""
from __future__ import annotations

import argparse
from pathlib import Path

from ultralytics import YOLO


"""
    Usage: python scripts/inference.py --image image/path --weights model/path

    When wanting to change condifence threshold:
    python scripts/inference.py --image image/path --weights model/path --conf <insert num here>
"""
def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, help="Path to the input image")
    parser.add_argument("--weights", default="runs/detect/run1/weights/best.pt",
                        help="Path to the trained .pt weights file")
    parser.add_argument("--conf", type=float, default=0.25)
    parser.add_argument("--imgsz", type=int, default=320)
    parser.add_argument("--output", default="output.jpg")
    args = parser.parse_args()

    weights_path = Path(args.weights)
    if not weights_path.exists():
        raise SystemExit(f"Weights not found at {weights_path}.")

    image_path = Path(args.image)
    if not image_path.exists():
        raise SystemExit(f"Image not found at {image_path}.")

    model = YOLO(str(weights_path))
    results = model(str(image_path), conf=args.conf, imgsz=args.imgsz, verbose=False)
    results[0].save(args.output)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()