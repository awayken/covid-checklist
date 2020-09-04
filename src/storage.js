const checksKey = 'checks';

function getToday() {
  const today = new Date();

  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

export function getChecks() {
  const checks = localStorage.getItem(checksKey);

  if (checks) {
    return JSON.parse(checks);
  }

  return {};
}

export function getPersons() {
  const checks = getChecks();

  return Object.keys(checks) || [];
}

export function saveCheck(person, asks) {
  if (person && person.length) {
    const saveKey = getToday();
    const checks = getChecks();

    if (!checks[person]) {
      checks[person] = {};
    }

    checks[person][saveKey] = asks;

    localStorage.setItem(checksKey, JSON.stringify(checks));
  }
}
