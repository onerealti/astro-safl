---
title: System Introduction
description: System introduction, objectives, and architecture overview of the Smart Agri Four Legged Bot.
---

## Project Abstract

The **Smart Agri Four Legged Bot** is a semi-autonomous agricultural robot designed to support precision farming through automated weed detection and in-situ soil condition monitoring. The project emphasizes modularity, mechanical reliability, and ease of maintenance under real-world agricultural constraints.

The robot is engineered around a hybrid fabrication approach:
1. **Mechanical Substructure**: A robust, laser-cut 3mm mild steel chassis reinforced with bottom plates and connected to four articulated planar legs.
2. **Electronics & Computing**: An **NVIDIA Jetson Nano** single-board computer acts as the central brain, handling visual input from an **Intel RealSense D435** depth camera and serial telemetry from an **Amici Sense** soil probe.
3. **Actuation & Low-Level Control**: An **Arduino Due** manages low-level motor control, driving four planetary geared DC motors for shoulder articulation and two distal brushless hub motors for locomotion.

---

## Project Objectives

*   **Terrain Adaptability**: Design a mechanically stable, terrain-capable chassis optimized for uneven, sloped agricultural fields.
*   **Structural Verification**: Validate the mechanical load paths, stress limits, and deflections using Finite Element Analysis (FEA) to guarantee structural safety.
*   **Hybrid Fabrication**: Construct load-bearing structures with steel while using FDM 3D printing (PETG/PLA+) for lightweight, non-structural covers and sensor enclosures.
*   **Vision-Based Weed Detection**: Integrate a real-time ML pipeline using deep learning (lightweight CNN) for weed bounding box classification on the edge.
*   **Precision Soil Probe**: Integrate an in-ground multi-parameter sensor to measure soil health parameters without tipping or stability issues.
*   **Resilient Electrical System**: Implement EMI signal isolation, separate power rails, and robust wiring layouts to ensure continuous field operation.

---

## System Architecture

The following block diagram illustrates the information flow, power rails, and control interfaces of the robot:

```mermaid
graph TD
    %% Power Section
    subgraph Power System
        Battery[24V 12Ah Li-ion Battery] --> Switch[Master Kill Switch]
        Switch --> Buck5V[DC-DC Buck Converter 5V]
        Switch --> Reg12V[DC-DC Regulator 12V]
        Switch --> Direct24V[Direct 24V Power Bus]
    end

    %% Compute Section
    subgraph Compute & Logic
        Jetson[NVIDIA Jetson Nano]
        Arduino[Arduino Due]
        Jetson <-->|UART 115200 Baud| Arduino
    end

    %% Perception Section
    subgraph Sensors & Input
        Camera[Intel RealSense D435 Depth Camera] -->|USB 3.0| Jetson
        Probe[Amici Sense Soil Probe] -->|UART GPIO| Jetson
    end

    %% Actuation Section
    subgraph Actuation & Drive
        Drivers[Dual H-Bridge Motor Drivers]
        ESCs[High-Current ESCs]
        Arduino -->|PWM Signals| Drivers
        Arduino -->|PWM Signals| ESCs
        Drivers -->|12V Rail| GearedMotors[4x Geared Shoulder Motors]
        ESCs -->|24V Rail| HubMotors[2x Distal Locomotion Hub Motors]
    end

    %% Power Routing
    Buck5V -->|5V Power| Jetson
    Buck5V -->|5V Power| Camera
    Buck5V -->|5V Power| Probe
    Reg12V -->|12V Power| Drivers
    Direct24V -->|24V Power| ESCs
```

---

## Key Hardware Summary

| Component | Specification | Purpose |
| :--- | :--- | :--- |
| **NVIDIA Jetson Nano** | Embedded GPU computer (Ubuntu 18.04 + PyTorch) | Runs CNN weed detection, logs soil data, sends movement commands. |
| **Arduino Due** | 32-bit ARM Cortex-M3 microcontroller (84 MHz) | Performs real-time low-level motor actuation and sync. |
| **Intel RealSense D435** | RGB-D Active Infrared Stereo depth camera | Captures depth profiling and RGB frames for ML inference. |
| **Amici Sense Probe** | Dual 180mm stainless steel probes | Measures soil moisture, pH, fertility, temperature, light, and humidity. |
| **Geared DC Motors** | 4x planetary geared units | Drives shoulder joints for body height and pitch adjustments. |
| **Brushless Hub Motors** | 2x 36V 350W direct-drive wheels | Distal foot units providing primary forward and reverse locomotion. |
