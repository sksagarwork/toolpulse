#!/bin/bash
echo "Stopping ToolPulse background service..."
systemctl --user stop toolpulse.service
echo "Stopped."
