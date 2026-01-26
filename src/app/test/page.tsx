'use client';

export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test Page - Works!</h1>
      <p>If you can see this, the basic rendering works.</p>
      <p>Time: {new Date().toISOString()}</p>
      <p>This is a client component test page.</p>
    </div>
  );
}

