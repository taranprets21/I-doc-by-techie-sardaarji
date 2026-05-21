import { useEffect, useState } from 'react';

const testSteps = [
  'Measure battery health',
  'Validate camera integrity',
  'Check screen and touch response',
  'Scan connectivity and sensors',
  'Confirm IMEI and component authenticity'
];

function TestSimulator() {
  const [status, setStatus] = useState('ready');
  const [currentStep, setCurrentStep] = useState(0);
  const [log, setLog] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (status !== 'running' || currentStep >= testSteps.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setLog((prev) => [...prev, `${testSteps[currentStep]} — Passed`]);
      setCurrentStep((step) => step + 1);
    }, 900);

    return () => clearTimeout(timeout);
  }, [status, currentStep]);

  useEffect(() => {
    if (status !== 'running') {
      return;
    }
    if (currentStep === testSteps.length) {
      setStatus('completed');
      setResult({ score: 98, notes: 'All tests passed. Device ready for resale.' });
    }
  }, [currentStep, status]);

  const startSimulation = () => {
    setStatus('running');
    setCurrentStep(0);
    setLog([]);
    setResult(null);
  };

  return (
    <div className="simulator-card">
      <div className="simulator-header">
        <div>
          <p className="eyebrow">On-demand diagnostics</p>
          <h3>Simulated test runner</h3>
        </div>
        <button className="button primary" onClick={startSimulation}>
          {status === 'running' ? 'Running...' : 'Start Test'}
        </button>
      </div>
      <div className="simulator-body">
        <div className="test-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / testSteps.length) * 100}%` }} />
          </div>
          <p>
            {status === 'ready'
              ? 'Ready to run diagnostics.'
              : status === 'running'
              ? `Running step ${Math.min(currentStep + 1, testSteps.length)} of ${testSteps.length}`
              : 'Diagnostics complete.'}
          </p>
        </div>
        <ul className="test-log">
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
          {status === 'ready' && <li>Click start to simulate a device inspection workflow.</li>}
        </ul>
        {result && (
          <div className="result-card">
            <h4>Final Report</h4>
            <p>Health score: <strong>{result.score}%</strong></p>
            <p>{result.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestSimulator;
