import test from 'node:test';
import assert from 'node:assert/strict';
import { renderTaskList } from '../src/components/TaskList.js';
import { formatDueDate } from '../src/utils/dateUtils.js';

test('renderTaskList handles empty task list', () => {
  const output = renderTaskList([]);
  assert.match(output, /No tasks available\./);
});

test('renderTaskList escapes HTML and quotes in titles and attributes', () => {
  const sample = [
    { id: 'task-1" onmouseover="alert(1)"', title: '<script>alert("xss")</script>', completed: false }
  ];
  const output = renderTaskList(sample);
  assert.ok(!output.includes('<script>'), 'Raw script tags must not be present');
  assert.ok(output.includes('&lt;script&gt;'), 'Script tags must be escaped');
  assert.ok(output.includes('&quot;'), 'Quotes must be escaped in attributes');
  assert.ok(output.includes('data-id="task-1&quot; onmouseover=&quot;alert(1)&quot;"'), 'data-id must be safely escaped');
});

test('formatDueDate formats valid and invalid dates properly', () => {
  assert.equal(formatDueDate(null), 'No due date');
  assert.equal(formatDueDate('invalid-date'), 'Invalid date');
  const formatted = formatDueDate(new Date('2026-11-15T00:00:00Z'));
  assert.ok(formatted.includes('2026'), 'Should format year');
});
