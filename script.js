document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const calendarBody = document.getElementById("calendarBody");
    const currentMonthDisplay = document.getElementById("currentMonth");
    const eventInput = document.getElementById("eventInput");
    const eventDate = document.getElementById("eventDate");
    const eventCostInput = document.getElementById("eventCost");
    const eventList = document.getElementById("eventList");
    const budgetInput = document.getElementById("budget");
    let budget = 0;

    // Update budget when user changes the input
    budgetInput.addEventListener("change", () => {
        budget = parseFloat(budgetInput.value) || 0;
        updateBudgetDisplay();
    });

    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        renderCalendar();
    });

    document.getElementById("addEvent").addEventListener("click", () => {
        const eventName = eventInput.value;
        const eventDateValue = eventDate.value;
        const eventCost = parseFloat(eventCostInput.value) || 0;

        if (eventName && eventDateValue && !isNaN(eventCost)) {
            if (budget - eventCost >= 0) {
                // Deduct event cost from budget
                budget -= eventCost;
                updateBudgetDisplay();

                const eventItem = document.createElement("li");
                eventItem.innerText = `${eventName} (${eventDateValue}) - Cost: $${eventCost.toFixed(2)}`;
                eventList.appendChild(eventItem);
                eventInput.value = "";
                eventDate.value = "";
                eventCostInput.value = "";
            } else {
                alert("Event cost exceeds budget!");
            }
        } else {
            alert("Please provide valid event details.");
        }
    });

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        currentMonthDisplay.innerText = `${firstDay.toLocaleString("en-US", {
            month: "long",
        })} ${currentYear}`;

        let day = new Date(firstDay);

        calendarBody.innerHTML = "";

        while (day <= lastDay) {
            const dayCell = document.createElement("td");
            dayCell.innerText = day.getDate();
            calendarBody.appendChild(dayCell);

            if (day.getDay() === 6) {
                dayCell.style.color = "blue"; // Highlight Saturdays
            }

            day.setDate(day.getDate() + 1);
        }
    }

    function updateBudgetDisplay() {
        document.getElementById("budget").value = budget.toFixed(2);
    }

    renderCalendar();
});
