---
title:          "Hardware-in-the-loop validation of physics-informed neural network for angles-only initial orbit determination in very short arcs"
date:           2026-08-04
selected:       true
pub:            "46th Committee on Space Research (COSPAR) Scientific Assembly 2026"
pub_pre:        "Accepted to "
# pub_post:       'Under review.'
pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2026"
# semantic_scholar_id: 204e3073870fae3d05bcbc2f6a8e263d9b72e776  # use this to retrieve citation count
abstract: >-
  The exponential growth of the Resident Space Object (RSO) population in Low Earth Orbit (LEO) necessitates robust Space Situational Awareness (SSA) capabilities. However, the high relative velocities in LEO frequently result in very short arc observations, which cause traditional Initial Orbit Determination (IOD) methods to diverge or yield physically impossible solutions. Developing algorithms capable of handling these regimes requires data that accurately reflects the complex, non-Gaussian noise characteristics of real optical sensors.
  This work presents a robust IOD pipeline developed and validated using a hardware-in-the-Loop optical starfield simulator incorporating the engineering model of the UPMSAT-4 multi-use star tracker. The payload comprises a 4.2-megapixel sCMOS sensor paired with a 29.7$^\circ$ $\times$ 29.7$^\circ$ field-of-view lens. By physically stimulating this sensor with high-fidelity generated starfields and RSOs, we generate a training dataset that preserves flight-representative radiometric properties. Crucially, this hardware-in-the-loop setup captures degradation modes that cannot be reliably simulated.
  This hardware-validated imagery is used to train and evaluate a Physics-Informed Neural Network (PINN). The architecture employs a two-stage hybrid approach to navigate the difficult very-short arc solution space. First, a metaheuristic global optimizer identifies the approximate orbital basin by searching the admissible region. Second, the PINN performs local refinement by embedding the governing equations of orbital motion as a regularization constraint. This physics-guided loss function allows the network to distinguish between true orbital dynamics and the specific sensor artifacts present in the Hardware-in-the-Loop data.
  Preliminary analysis highlights the algorithm's resilience against these realistic sensor degradations compared to industry-standard iterative solvers. Results indicate that the physics-informed regularization significantly mitigates the singularity issues common in angles-only inversion, maintaining solution stability even when subjected to the non-linear noise profiles. These findings provide critical validation for the use of physics-guided machine learning in processing real-world optical data, demonstrating a pathway toward more robust, noise-resilient SSA architectures for future distributed sensor networks.
authors:
  - Ian Porto
  - Marissa Myhre
  - Sofia Meson-Perez
  - Angel Porras-Hermoso
  - Gunho Sohn
  - Regina S.K. Lee
links:
  Abstract: https://www.cospar-assembly.org/user/download.php?id=37905&type=abstract&section=congressbrowser
---
