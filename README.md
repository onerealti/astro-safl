# Smart Agri Four Legged Bot (S.A.F.L)

<p align="center">
  <img src="repository-open-graph-template.png" alt="S.A.F.L Logo" width="600"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-v6.4-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro Version" />
  <img src="https://img.shields.io/badge/Starlight-v2-7C3AED?style=flat-square&logo=starlight&logoColor=white" alt="Starlight Theme" />
  <img src="https://img.shields.io/badge/Package--Manager-pnpm-F6A80F?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Hackathon-1st%20Place%20Winner-success?style=flat-square" alt="1st Place Winner" />
</p>

S.A.F.L (Smart Agri Four Legged Bot) is an undergraduate research project designing a semi-autonomous agricultural robot. The platform integrates mechanical linkages optimized for rugged field navigation, edge computer-vision for crop health monitoring, and automated soil telemetry logging.

This repository serves as the official validation portal and R&D Cell completion report, formatted as a highly optimized static documentation hub.

---

## 🤖 System Architecture

The robot coordinates low-level motor actuation, computer vision classification, and environmental sensor sweeps:

```
                  +-----------------------------------+
                  |      Intel RealSense D435         |
                  +-----------------+-----------------+
                                    | (USB 3.0)
                                    v
  +-------------------+   +---------+---------+   +-------------------+
  | Amici Soil Probe  |-->|  NVIDIA Jetson    |<--| Battery Telemetry |
  | (UART via Shift)  |   |    Nano (4GB)     |   |   (Analog ADC)    |
  +-------------------+   +---------+---------+   +-------------------+
                                    | (USB Serial)
                                    v
                          +---------+---------+
                          |    Arduino Due    |
                          +---------+---------+
                            /               \
                           /                 \
                          v                   v
                +---------+---------+       +---------+---------+
                | Geared DC Motors  |       | Brushless Hub     |
                | (Shoulder Joints) |       | (Locomotion)      |
                +-------------------+       +-------------------+
```

---

## 📊 Core Engineering Specifications

### 1. Structural Stress & Deflection (FEA Verification)
All chassis parts were designed in SolidWorks and stress-tested using 10-node quadratic tetrahedral solid meshes to identify maximum displacement and Von Mises stress zones under loads:

*   **Case 1: Static Vertical Deck Load (98 N)**
    *   *Simulated Weight*: 10 kg payload (batteries, computers, sensors).
    *   *Performance*: Max displacement of **0.313 mm** (center); Max stress **42.58 MPa**.
    *   *Factor of Safety (FOS)*: **5.17**.
*   **Case 2: Dynamic Lateral Bump Force (30 N)**
    *   *Simulated Impact*: Sudden side collisions during traversal.
    *   *Performance*: Max displacement of **3.60 mm**; Max stress **108.00 MPa** (bolt flanges).
    *   *Factor of Safety (FOS)*: **2.04** (critical threshold met).
*   **Case 3: Soil Probe Insertion Backpressure (20 N)**
    *   *Simulated Force*: Hard soil resistance during vertical docking sweeps.
    *   *Performance*: Max displacement of **0.78 mm**; Max stress **43.00 MPa** (probe neck).
    *   *Factor of Safety (FOS)*: **14.40**.

### 2. Edge ML Vision Pipeline
*   **Model**: Custom lightweight Convolutional Neural Network (CNN).
*   **Target**: Real-time broad-leaf weed classification.
*   **Hardware Accelerator**: NVIDIA Jetson Nano (Maxwell GPU).
*   **Inference Latency**: Deployed local processing yields up to **9.2 FPS**.
*   **Stability Filter**: Implements a rolling **3-frame confidence average** to mitigate motion jitter and prevent false positives.

### 3. Level-Shifted Soil Telemetry
*   **Sensor Unit**: Amici Sense multi-parameter dual-probe.
*   **Parameters Logged**: Soil moisture (%), pH, Electrical Conductivity (EC, µS/cm), Soil Temperature (°C), Sunlight (Lux), and Air Humidity (% RH).
*   **Logic Isolation**: Uses bidirectional level-shifters to match the probe's 5V UART signals to the Jetson Nano’s 3.3V GPIO boundaries.

---

## 📁 Repository Directory Structure

```
.
├── public/                     # Icons, math styling assets, and static images
├── src/
│   ├── assets/                 # CAD renders, FEA plot diagrams, and Hackathon photos
│   ├── components/             # Astro overrides (Custom glowing Hero, dynamic MarkdownContent)
│   ├── content/
│   │   ├── docs/               # Markdown/MDX validation reports
│   │   │   ├── credentials.mdx  # Academic credits, guidelines, and Hackathon wins
│   │   │   ├── index.mdx        # Project landing/splash configuration
│   │   │   ├── intro.mdx        # Mechanical layout, coords, and joint definitions
│   │   │   ├── mechanical-assembly.mdx  # Elegoo printing profiles and assembly fixes
│   │   │   ├── ml-vision.mdx    # PyTorch inference FPS metrics and vibration mounts
│   │   │   ├── project-report.mdx # Research completion summaries
│   │   │   ├── soil-telemetry.mdx # Field logs (Trials A, B, and C)
│   │   │   └── structural-simulation.mdx # SOLID187 mesh files and Stress/Strain analysis
│   │   └── config.ts           # Collections validation schema
│   └── styles/
│       └── custom.css          # Theme variable extensions and UI overrides
├── astro.config.mjs            # Main config (integrating Math, Mermaid, and Black Theme)
├── package.json                # Project script mappings
└── pnpm-lock.yaml              # Lockfile
```

---

## 🚀 Local Development Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.14.1 or higher)
*   [pnpm](https://pnpm.io/) (v8 or higher)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/onerealti/astro-safl.git
    cd astro-safl
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Launch the dev server:
    ```bash
    pnpm dev
    ```
    The application will hot-reload live at `http://localhost:4321/astro-safl/`.

4.  Compile static production bundle:
    ```bash
    pnpm build
    ```
    This outputs the built pages under the `./dist/` directory.

---

## 🏆 Honors & Recognition

Team SAFL-B was awarded **1st Place Winner** at the city-wide **MAKEFORHYDERABAD** Make-a-thon competition (sponsored by Titan Company, Symbiosis Institute of Technology, and InUnity Pvt. Ltd.) for showing complete mechanical integration, local inference speed, and practical field telemetry outputs.
