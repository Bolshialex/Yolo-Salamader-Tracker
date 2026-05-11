import subprocess
import os

def extract_frames(video_path: str, output_folder: str = "data", fps: str = None):
    """
    Extract frames from a video using ffmpeg.

    Args:
        video_path:    Path to the input video file.
        output_folder: Destination folder for frames (default: "data").
        fps:           Frames per second to extract. None = every frame.
    """
    os.makedirs(output_folder, exist_ok=True)

    output_pattern = os.path.join(output_folder, "frame_%06d.jpq")

    # Build ffmpeg command
    cmd = ["ffmpeg", "-i", video_path]

    if fps:
        cmd += ["-vf", f"fps={fps}"]

    cmd += [output_pattern]

    print(f"Extracting frames from: {video_path}")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print("ffmpeg error:")
        print(result.stderr)
    else:
        frame_count = len([f for f in os.listdir(output_folder) if f.endswith(".png")])
        print(f"Done. {frame_count} frames saved to '{output_folder}/'")


# --- Usage ---
extract_frames("public/oldVids/ensantina.mp4", "public/newVids", fps=0.35)