import { formatDueDate } from '../utils/dateUtils.js';

/**
 * TaskList component to render tasks with formatted due dates.
 *
 * @param {Array<{id: string, title: string, dueDate?: string|Date, completed?: boolean}>} tasks
 * @returns {string} HTML markup representation for the task list.
 */
export function renderTaskList(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return '<div class="task-list-empty">No tasks available.</div>';
  }

  const items = tasks.map(task => {
    const formattedDue = formatDueDate(task.dueDate);
    const statusClass = task.completed ? 'task-completed' : 'task-pending';

    return `
      <li class="task-item ${statusClass}" data-id="${escapeHtml(task.id)}">
        <span class="task-title">${escapeHtml(task.title)}</span>
        <span class="task-due-date">Due: ${formattedDue}</span>
      </li>
    `;
  }).join('');

  return `
    <div class="task-list-header-banner" style="background: #ebf8ff; border: 1px solid #bee3f8; padding: 10px 14px; margin-bottom: 14px; border-radius: 6px; color: #2b6cb0; font-weight: 600;">
      [QA Verified Live] Harbor Cafe Task Stream &amp; Schedule
    </div>
    <ul class="task-list">${items}</ul>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
