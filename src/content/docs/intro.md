---
title: System Introduction
description: System introduction, objectives, and architecture overview of the Smart Agri Four Legged Bot.
---

## Project Abstract

The **Smart Agri Four Legged Bot** is a semi-autonomous agricultural robot designed to support precision farming through automated weed detection and in-situ soil condition monitoring. The project emphasizes modularity, mechanical reliability, and ease of maintenance under real-world agricultural constraints.

| Symmetrical CAD Overview | Top-Left Render View |
| :---: | :---: |
| ![Figure 3.1: Isometric CAD view of the complete robot](../../assets/images/AgriML_77_Page_34_Image_0001.jpg) | ![Figure 3.17: Final CAD render, top-left view](../../assets/images/AgriML_77_Page_46_Image_0001.jpg) |

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

### Internal Layout CAD Detail

The internal layout was designed to separate data processing units from high-current power electronics to minimize EMI and facilitate thermal convection.

| Internal Layout Cutaway | Bottom View with Stiffeners |
| :---: | :---: |
| ![Figure 3.3: Internal cutaway showing battery and boards](../../assets/images/AgriML_77_Page_36_Image_0001.jpg) | ![Figure 3.2: Chassis base plate with reinforcement stiffeners](../../assets/images/AgriML_77_Page_35_Image_0001.jpg) |

---

## Kinematics & Leg Articulation

The robot's planar legs are articulated in three segments, allowing the body to adjust its pitch and ground height to maintain vertical camera stability and traction over sloped terrain.

| Left Side View (Inclined Posture) | Right Side View (Neutral Posture) |
| :---: | :---: |
| ![Figure 3.12: Left side view of bot in inclined posture](../../assets/images/AgriML_77_Page_42_Image_0001.jpg) | ![Figure 3.13: Right side view of bot in neutral posture](../../assets/images/AgriML_77_Page_42_Image_0002.jpg) |

*   **Extended Layout (Declined configuration for downhill locomotion)**:
    ![Figure 3.14: Extended leg layout for downhill travel](../../assets/images/AgriML_77_Page_43_Image_0001.jpg)

### Leg Mechanical Linkages & Compliance

Each planar leg is engineered as a modular three-joint assembly (Hip, Knee, and Foot) with passive compliance and internal routing pathways:

*   **Torsional Spring compliance**: A torsional spring joint is embedded in the knee joint housing to act as a passive compliance mechanism, helping to absorb ground vibration and keep traction over uneven profiles.
*   **Split-Piece Routing Layout**: Thigh and shin segments feature a split-piece layout that allows routing high-current lines and encoder cables internally, protecting wires from exposure and mechanical wear.

| Exploded Leg-Wheel Assembly | Leg Module CAD Detail | Knee Joint Torsional Spring |
| :---: | :---: | :---: |
| ![Figure 3.4: Exploded view of leg-wheel assembly](../../assets/images/AgriML_77_Page_37_Image_0001.jpg) | ![Figure 3.5: Leg module with distal hub motor](../../assets/images/AgriML_77_Page_38_Image_0001.jpg) | ![Figure 3.6: Torsional spring compliance joint](../../assets/images/AgriML_77_Page_39_Image_0001.jpg) |

| Shin Routing (Inner seat) | Shin Routing (Outer seat) | Thigh Routing (Inner seat) | Thigh Routing (Outer seat) |
| :---: | :---: | :---: | :---: |
| ![Figure 3.7: Shin internal channel split 1](../../assets/images/AgriML_77_Page_39_Image_0002.jpg) | ![Figure 3.8: Shin internal channel split 2](../../assets/images/AgriML_77_Page_40_Image_0001.jpg) | ![Figure 3.9: Thigh internal channel split 1](../../assets/images/AgriML_77_Page_40_Image_0002.jpg) | ![Figure 3.10: Thigh internal channel split 2](../../assets/images/AgriML_77_Page_41_Image_0001.jpg) |

| Shin-to-Wheel Linkage |
| :---: |
| ![Figure 3.11: Distal shin assembled with hub wheel](../../assets/images/AgriML_77_Page_41_Image_0002.jpg) |

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

---

## Project Photo Gallery

Below are selected high-resolution photographs taken during the assembly and field testing phase of the physical prototype:

| Completed Prototype Assembly | Laboratory Assembly Workbench |
| :---: | :---: |
| ![Smart Agri Four Legged Bot](../../assets/images/images_dump/img.jpg) | ![Student Team Work Session](../../assets/images/images_dump/IMG_0276(1).jpg) |
| **Internal Compartments Layout** | **Early Prototype Stage** |
| ![Chassis Internal Compartment Layout](../../assets/images/images_dump/IMG_0324(1).jpg) | ![First-Phase Prototype Traversal Check](../../assets/images/images_dump/WhatsApp%20Image%202026-04-12%20at%2021.10.25.jpeg) |

