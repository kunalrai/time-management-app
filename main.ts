interface TimeEntry {
  clientName: string;
  date: string;
  duration: number;
  amount: number;
}
let startTime: number | null = null;
let timerInterval: number | null = null;
const timeEntries: TimeEntry[] = [];
const clientNameInput = document.getElementById("clientName") as HTMLInputElement;
const hourlyRateInput = document.getElementById("hourlyRate") as HTMLInputElement;


const startButton = document.getElementById("startTimer") as HTMLButtonElement;
const stopButton = document.getElementById("stopTimer") as HTMLButtonElement;
const reportTable = document.getElementById("report") as HTMLTableElement;
const elapsedTimeDisplay = document.getElementById("elapsedTime") as HTMLSpanElement;

function msToTime(duration: number): string {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${hours} hr ${minutes} min ${seconds} sec`;
}

function addToReport(entry: TimeEntry) {
  const row = reportTable.insertRow(-1);
  const clientNameCell = row.insertCell(0);
  const dateCell = row.insertCell(1);
  const durationCell = row.insertCell(2);
  const amountCell = row.insertCell(3);
  clientNameCell.textContent = entry.clientName;
  dateCell.textContent = entry.date;
  durationCell.textContent = msToTime(entry.duration);
  amountCell.textContent = `$${entry.amount.toFixed(2)}`;
}

startButton.addEventListener("click", () => {
  if (timerInterval) return;
  startTime = Date.now();
  timerInterval = window.setInterval(() => {
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      elapsedTimeDisplay.textContent = msToTime(elapsedTime);
    }
  }, 1000);
});

stopButton.addEventListener("click", () => {
  if (!timerInterval || !startTime) return;
  clearInterval(timerInterval);
  timerInterval = null;
  const endTime = Date.now();
  const duration = endTime - startTime;
  startTime = null;
  const clientName = clientNameInput.value;
  const date = new Date().toLocaleDateString();
  const hourlyRate = parseFloat(hourlyRateInput.value);
  const amount = (duration / 3600000) * hourlyRate;
  const entry: TimeEntry = { clientName, date, duration, amount };
  timeEntries.push(entry);
  addToReport(entry);
  elapsedTimeDisplay.textContent = "0 hr 0 min 0 sec";
});