import { ResearchIntegrityReport } from './types';

export const SYNTHETIC_DEMO_REPORT: ResearchIntegrityReport = {
  report_id: 'demo-report-2026-001',
  mode: 'SYNTHETIC_DEMO',
  analysis_date: '2026-09-16T10:30:00Z',
  priority: 'HIGH',
  summary: 'This synthetic document contains 5 extracted citations, 5 references, and 6 substantive research claims. Three claims require faculty review due to numerical discrepancies or missing source backing, one reference could not be verified in academic DOI registries, one passage exhibits potential similarity with institutional archives, and two internal section inconsistencies were detected.',
  document: {
    id: 'demo-doc-001',
    title: 'Hybrid Quantum Neural Networks for Real-Time Biomedical ECG Anomaly Detection',
    original_filename: 'Quantum_Biomedical_ECG_Thesis_Draft_v3.pdf',
    file_type: 'PDF',
    file_size: 4850200,
    document_type: 'Thesis / Dissertation',
    author_name: 'Alex Vance',
    department: 'Department of Biomedical Engineering & Computing',
    course: 'BME-804 Doctoral Thesis Review',
    semester: 'Fall 2026',
    faculty_reviewer: 'Dr. E. R. Harrington',
    uploaded_at: '2026-09-16T10:15:00Z',
    page_count: 8,
    mode: 'SYNTHETIC_DEMO'
  },
  counts: {
    similarity: 2,
    references_checked: 5,
    references_flagged: 1,
    claims_analyzed: 6,
    claims_unclear: 3,
    citation_issues: 2,
    consistency_issues: 2,
    review_indicators: 3
  },
  sections: [
    {
      section_id: 'sec-1',
      title: 'Abstract',
      content: 'Biomedical signal monitoring requires ultra-fast anomaly detection to alert clinical staff during cardiac events. In this thesis draft, we introduce Q-BioNet, a hybrid variational quantum-classical neural network architecture designed for real-time electrocardiology analysis. Evaluated on a benchmark dataset of 12,000 multi-lead ECG recordings from the PhysioNet arrhythmia archive, Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window [1]. Our comparative analysis demonstrates a 35% reduction in parameter complexity relative to traditional deep convolutional baselines.',
      start_page: 1,
      end_page: 1
    },
    {
      section_id: 'sec-2',
      title: 'Introduction & Related Work',
      content: 'Cardiovascular disease remains the leading global cause of mortality, demanding continuous non-invasive diagnostic capabilities [2]. Classical deep neural networks, while accurate, incur severe computational overhead on resource-constrained wearable monitors (Smith & Kumar, 2023). Quantum machine learning offers potential quadratic speedups in feature extraction by mapping high-dimensional physiological signals into Hilbert space state vectors [3]. Recent studies by Zhang et al. (2025) reported 99.1% accuracy using 16-qubit NISQ devices on synthetic signals.',
      start_page: 1,
      end_page: 2
    },
    {
      section_id: 'sec-3',
      title: 'Methodology & Dataset Setup',
      content: 'We constructed the experimental corpus by aggregating 9,500 annotated multi-lead ECG signals from public clinical repositories. Noise reduction was executed via 4th-order Butterworth bandpass filtering (0.5–45 Hz). The quantum circuit layout utilizes an 8-qubit parameterised ansatz with hardware-efficient entangling layers. All simulations were conducted using Qiskit Aer GPU backends operating under simulated thermal decoherence models.',
      start_page: 3,
      end_page: 4
    },
    {
      section_id: 'sec-4',
      title: 'Experimental Results & Discussion',
      content: 'During empirical validation across 5-fold cross-validation, Q-BioNet demonstrated a peak mean accuracy of 94.2% and F1-score of 0.925. Notably, our framework achieved an unprecedented 97.4% accuracy when evaluated under 10dB Gaussian noise conditions [4]. Cross-hardware benchmarks confirm an execution latency of 18.5ms on simulated trapped-ion platforms.',
      start_page: 5,
      end_page: 6
    },
    {
      section_id: 'sec-5',
      title: 'Conclusion',
      content: 'This work provides empirical evidence supporting the deployment of hybrid quantum models in biomedical diagnostics. Future investigations will target physical deployment on fault-tolerant quantum processing units.',
      start_page: 7,
      end_page: 7
    },
    {
      section_id: 'sec-6',
      title: 'References',
      content: '[1] Smith, A. & Kumar, R. (2023). Deep learning for wearable ECG monitors. Journal of Biomedical Informatics, 114, 103-112.\n[2] World Health Organization. (2024). Cardiovascular Diseases Global Report.\n[3] Zhang, Y., et al. (2025). Quantum machine learning on NISQ devices. Nature Quantum Information, 11(2), 45-58.\n[4] Patel, K. & O\'Connor, M. (2025). Noise robustness in quantum neural networks. IEEE Transactions on Medical Imaging, 44(8), 2100-2112.\n[5] Vance, A. & Miller, J. (2026). Advanced Quantum Signal Processing. International Journal of Quantum Computing, 99(1), 1-15.',
      start_page: 8,
      end_page: 8
    }
  ],
  paragraphs: [
    {
      paragraph_id: 'p-1',
      section: 'Abstract',
      page_number: 1,
      paragraph_index: 0,
      text: 'Biomedical signal monitoring requires ultra-fast anomaly detection to alert clinical staff during cardiac events. In this thesis draft, we introduce Q-BioNet, a hybrid variational quantum-classical neural network architecture designed for real-time electrocardiology analysis. Evaluated on a benchmark dataset of 12,000 multi-lead ECG recordings from the PhysioNet arrhythmia archive, Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window [1]. Our comparative analysis demonstrates a 35% reduction in parameter complexity relative to traditional deep convolutional baselines.'
    },
    {
      paragraph_id: 'p-2',
      section: 'Introduction & Related Work',
      page_number: 1,
      paragraph_index: 1,
      text: 'Cardiovascular disease remains the leading global cause of mortality, demanding continuous non-invasive diagnostic capabilities [2]. Classical deep neural networks, while accurate, incur severe computational overhead on resource-constrained wearable monitors (Smith & Kumar, 2023). Quantum machine learning offers potential quadratic speedups in feature extraction by mapping high-dimensional physiological signals into Hilbert space state vectors [3]. Recent studies by Zhang et al. (2025) reported 99.1% accuracy using 16-qubit NISQ devices on synthetic signals.'
    },
    {
      paragraph_id: 'p-3',
      section: 'Methodology & Dataset Setup',
      page_number: 3,
      paragraph_index: 2,
      text: 'We constructed the experimental corpus by aggregating 9,500 annotated multi-lead ECG signals from public clinical repositories. Noise reduction was executed via 4th-order Butterworth bandpass filtering (0.5–45 Hz). The quantum circuit layout utilizes an 8-qubit parameterised ansatz with hardware-efficient entangling layers. All simulations were conducted using Qiskit Aer GPU backends operating under simulated thermal decoherence models.'
    },
    {
      paragraph_id: 'p-4',
      section: 'Experimental Results & Discussion',
      page_number: 5,
      paragraph_index: 3,
      text: 'During empirical validation across 5-fold cross-validation, Q-BioNet demonstrated a peak mean accuracy of 94.2% and F1-score of 0.925. Notably, our framework achieved an unprecedented 97.4% accuracy when evaluated under 10dB Gaussian noise conditions [4]. Cross-hardware benchmarks confirm an execution latency of 18.5ms on simulated trapped-ion platforms.'
    },
    {
      paragraph_id: 'p-5',
      section: 'Conclusion',
      page_number: 7,
      paragraph_index: 4,
      text: 'This work provides empirical evidence supporting the deployment of hybrid quantum models in biomedical diagnostics. Future investigations will target physical deployment on fault-tolerant quantum processing units.'
    }
  ],
  citations: [
    {
      citation_id: 'cit-1',
      raw_text: '[1]',
      location: { page: 1, section: 'Abstract' },
      associated_text: 'Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window [1].',
      confidence: 'high'
    },
    {
      citation_id: 'cit-2',
      raw_text: '[2]',
      location: { page: 1, section: 'Introduction & Related Work' },
      associated_text: 'Cardiovascular disease remains the leading global cause of mortality [2].',
      confidence: 'high'
    },
    {
      citation_id: 'cit-3',
      raw_text: '[3]',
      location: { page: 2, section: 'Introduction & Related Work' },
      associated_text: 'Quantum machine learning offers potential quadratic speedups... [3]',
      confidence: 'high'
    },
    {
      citation_id: 'cit-4',
      raw_text: '[4]',
      location: { page: 5, section: 'Experimental Results & Discussion' },
      associated_text: 'achieved an unprecedented 97.4% accuracy when evaluated under 10dB Gaussian noise conditions [4].',
      confidence: 'high'
    }
  ],
  references: [
    {
      reference_id: 'ref-1',
      raw_text: '[1] Smith, A. & Kumar, R. (2023). Deep learning for wearable ECG monitors. Journal of Biomedical Informatics, 114, 103-112.',
      title: 'Deep learning for wearable ECG monitors',
      authors: ['Smith, A.', 'Kumar, R.'],
      year: 2023,
      journal: 'Journal of Biomedical Informatics',
      doi: '10.1016/j.jbi.2023.103112',
      verification_status: 'GREEN',
      verification_reason: 'Metadata verified via CrossRef DOI index.'
    },
    {
      reference_id: 'ref-2',
      raw_text: '[2] World Health Organization. (2024). Cardiovascular Diseases Global Report.',
      title: 'Cardiovascular Diseases Global Report',
      authors: ['World Health Organization'],
      year: 2024,
      verification_status: 'GREEN',
      verification_reason: 'Institutional public health publication verified.'
    },
    {
      reference_id: 'ref-3',
      raw_text: '[3] Zhang, Y., et al. (2025). Quantum machine learning on NISQ devices. Nature Quantum Information, 11(2), 45-58.',
      title: 'Quantum machine learning on NISQ devices',
      authors: ['Zhang, Y.', 'Liu, H.'],
      year: 2025,
      doi: '10.1038/s41534-025-00123-x',
      verification_status: 'GREEN',
      verification_reason: 'Metadata matched journal release.'
    },
    {
      reference_id: 'ref-4',
      raw_text: '[4] Patel, K. & O\'Connor, M. (2025). Noise robustness in quantum neural networks. IEEE Transactions on Medical Imaging, 44(8), 2100-2112.',
      title: 'Noise robustness in quantum neural networks',
      authors: ['Patel, K.', 'O\'Connor, M.'],
      year: 2025,
      verification_status: 'AMBER',
      verification_reason: 'Source verified, but cited volume/issue metadata exhibits minor offset.'
    },
    {
      reference_id: 'ref-5',
      raw_text: '[5] Vance, A. & Miller, J. (2026). Advanced Quantum Signal Processing. International Journal of Quantum Computing, 99(1), 1-15.',
      title: 'Advanced Quantum Signal Processing',
      authors: ['Vance, A.', 'Miller, J.'],
      year: 2026,
      journal: 'International Journal of Quantum Computing',
      verification_status: 'RED',
      verification_reason: 'Reference could not be verified with available sources. Journal volume 99(1) does not exist in master index.'
    }
  ],
  claims: [
    {
      claim_id: 'clm-1',
      claim_text: 'Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window.',
      location: { page: 1, section: 'Abstract' },
      claim_type: 'numerical',
      citation_ids: ['cit-1'],
      importance: 'high',
      support_status: 'PARTIALLY_SUPPORTED',
      evidence_summary: 'Cited source [1] (Smith & Kumar 2023) evaluates classical CNNs, not Q-BioNet. The performance claim refers to the authors own model but is cited to prior literature.',
      confidence: 0.91
    },
    {
      claim_id: 'clm-2',
      claim_text: 'Evaluated on a benchmark dataset of 12,000 multi-lead ECG recordings.',
      location: { page: 1, section: 'Abstract' },
      claim_type: 'numerical',
      citation_ids: [],
      importance: 'high',
      support_status: 'UNCLEAR',
      evidence_summary: 'Conflict with Section 3 (Methodology), which states the corpus consists of 9,500 recordings.',
      confidence: 0.95
    },
    {
      claim_id: 'clm-3',
      claim_text: 'Achieved an unprecedented 97.4% accuracy when evaluated under 10dB Gaussian noise conditions.',
      location: { page: 5, section: 'Experimental Results & Discussion' },
      claim_type: 'numerical',
      citation_ids: ['cit-4'],
      importance: 'high',
      support_status: 'PARTIALLY_SUPPORTED',
      evidence_summary: 'Source [4] discusses noise robustness theoretically, but does not report 97.4% for this specific quantum network layout.',
      confidence: 0.88
    },
    {
      claim_id: 'clm-4',
      claim_text: 'Quantum machine learning offers potential quadratic speedups in feature extraction.',
      location: { page: 2, section: 'Introduction & Related Work' },
      claim_type: 'scientific',
      citation_ids: ['cit-3'],
      importance: 'medium',
      support_status: 'SUPPORTED',
      evidence_summary: 'Supported by cited literature [3] (Zhang et al. 2025).',
      confidence: 0.96
    }
  ],
  similarity_matches: [
    {
      similarity_id: 'sim-1',
      submitted_passage: 'Quantum machine learning offers potential quadratic speedups in feature extraction by mapping high-dimensional physiological signals into Hilbert space state vectors.',
      potential_source: 'Institutional Thesis Corpus #2024-BME-89 (Author: R. Sharma)',
      similarity_level: 'HIGH',
      matched_concept: 'Direct sentence overlap with previous institutional thesis submission.',
      source_info: 'Archive Document ID: #2024-BME-89, Page 12, Paragraph 3',
      location: { page: 2, section: 'Introduction & Related Work' }
    },
    {
      similarity_id: 'sim-2',
      submitted_passage: 'Noise reduction was executed via 4th-order Butterworth bandpass filtering (0.5–45 Hz). The quantum circuit layout utilizes an 8-qubit parameterised ansatz.',
      potential_source: 'Open Academic Paper (IEEE Open Access 2024)',
      similarity_level: 'MODERATE',
      matched_concept: 'Standard methodology phrasing overlap.',
      source_info: 'DOI: 10.1109/ACCESS.2024.3391002',
      location: { page: 3, section: 'Methodology & Dataset Setup' }
    }
  ],
  consistency_findings: [
    {
      finding_id: 'con-1',
      title: 'Dataset Volume Discrepancy (Abstract vs. Methodology)',
      location_a: 'Abstract (Page 1)',
      location_b: 'Methodology & Dataset Setup (Page 3)',
      statement_a: 'Evaluated on a benchmark dataset of 12,000 multi-lead ECG recordings',
      statement_b: 'We constructed the experimental corpus by aggregating 9,500 annotated multi-lead ECG signals',
      inconsistency_type: 'dataset',
      severity: 'HIGH',
      explanation: 'The Abstract claims a dataset size of 12,000 ECG recordings, whereas the Methodology section specifies 9,500 recordings. Faculty review recommended to confirm actual sample size.'
    },
    {
      finding_id: 'con-2',
      title: 'Accuracy Metric Discrepancy (Abstract vs. Results)',
      location_a: 'Abstract (Page 1)',
      location_b: 'Experimental Results & Discussion (Page 5)',
      statement_a: 'achieved a classification accuracy of 98.4%',
      statement_b: 'Q-BioNet demonstrated a peak mean accuracy of 94.2%',
      inconsistency_type: 'metric',
      severity: 'HIGH',
      explanation: 'Abstract reports 98.4% classification accuracy, while Section 4 reports a peak mean accuracy of 94.2% across 5-fold cross-validation.'
    }
  ],
  review_indicators: [
    {
      indicator_id: 'ind-1',
      title: 'Unverifiable Self-Citation Reference',
      location: { page: 8, section: 'References' },
      reason: 'Reference [5] lists a 2026 paper by the primary student author in International Journal of Quantum Computing, Vol 99(1). Master registry lookup returned no record.',
      confidence: 0.94,
      severity: 'HIGH'
    },
    {
      indicator_id: 'ind-2',
      title: 'Citation Mismatch on Performance Metric',
      location: { page: 1, section: 'Abstract' },
      reason: 'Sentence cites Reference [1] for Q-BioNet accuracy, but Reference [1] is an external 2023 paper on classical CNN monitors.',
      confidence: 0.92,
      severity: 'HIGH'
    },
    {
      indicator_id: 'ind-3',
      title: 'Uncited High-Impact Numerical Claim',
      location: { page: 5, section: 'Experimental Results & Discussion' },
      reason: 'Claim regarding execution latency of 18.5ms on simulated trapped-ion platforms lacks backing data or benchmark citation.',
      confidence: 0.85,
      severity: 'MEDIUM'
    }
  ],
  findings: [
    {
      id: 'fnd-1',
      type: 'consistency',
      title: 'Dataset Volume Discrepancy (12,000 vs 9,500 samples)',
      severity: 'HIGH',
      page: 1,
      section: 'Abstract',
      text_snippet: 'Evaluated on a benchmark dataset of 12,000 multi-lead ECG recordings from the PhysioNet arrhythmia archive...',
      reason: 'Abstract claims 12,000 samples, but Methodology (Page 3) specifies 9,500 samples.',
      evidence: 'Comparison between Abstract paragraph 1 and Methodology paragraph 1.',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-2',
      type: 'consistency',
      title: 'Accuracy Metric Discrepancy (98.4% vs 94.2%)',
      severity: 'HIGH',
      page: 1,
      section: 'Abstract',
      text_snippet: 'Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window [1].',
      reason: 'Abstract states 98.4% accuracy, while Results section (Page 5) reports 94.2% mean accuracy.',
      evidence: 'Abstract statement conflicts directly with cross-validation results table.',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-3',
      type: 'reference',
      title: 'Unverifiable Reference [5]',
      severity: 'HIGH',
      page: 8,
      section: 'References',
      text_snippet: '[5] Vance, A. & Miller, J. (2026). Advanced Quantum Signal Processing. International Journal of Quantum Computing, 99(1), 1-15.',
      reason: 'Could not verify with available sources. International Journal of Quantum Computing Vol 99(1) does not exist in master indexing records.',
      evidence: 'CrossRef & Scopus metadata queries returned zero matches.',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-4',
      type: 'citation',
      title: 'Citation Mismatch on Performance Claim',
      severity: 'HIGH',
      page: 1,
      section: 'Abstract',
      text_snippet: 'Q-BioNet achieved a classification accuracy of 98.4% with a latency under 12ms per window [1].',
      reason: 'Citation [1] links to Smith & Kumar (2023), which evaluates classical CNNs rather than the proposed quantum model.',
      evidence: 'Reference [1] title: "Deep learning for wearable ECG monitors", published 2023.',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-5',
      type: 'similarity',
      title: 'High Similarity with Institutional Archive #2024-BME-89',
      severity: 'HIGH',
      page: 2,
      section: 'Introduction & Related Work',
      text_snippet: 'Quantum machine learning offers potential quadratic speedups in feature extraction by mapping high-dimensional physiological signals into Hilbert space state vectors.',
      reason: 'Direct passage similarity detected against previously submitted institutional thesis.',
      evidence: 'Archive match: Institutional Document #2024-BME-89 (Page 12).',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-6',
      type: 'claim',
      title: 'Partially Supported Claim under 10dB Gaussian Noise',
      severity: 'MEDIUM',
      page: 5,
      section: 'Experimental Results & Discussion',
      text_snippet: 'achieved an unprecedented 97.4% accuracy when evaluated under 10dB Gaussian noise conditions [4].',
      reason: 'Source [4] discusses noise models generally, but does not contain results for 10dB Gaussian noise in Q-BioNet.',
      evidence: 'Source #4 IEEE TMI paper text analysis.',
      action: { status: 'UNREVIEWED' }
    },
    {
      id: 'fnd-7',
      type: 'indicator',
      title: 'Uncited Trapped-Ion Hardware Benchmark Claim',
      severity: 'MEDIUM',
      page: 5,
      section: 'Experimental Results & Discussion',
      text_snippet: 'Cross-hardware benchmarks confirm an execution latency of 18.5ms on simulated trapped-ion platforms.',
      reason: 'Precise hardware latency figure lacks corresponding benchmark methodology details or citations.',
      evidence: 'Reviewer flag: missing experimental parameters for trapped-ion simulation.',
      action: { status: 'UNREVIEWED' }
    }
  ]
};
