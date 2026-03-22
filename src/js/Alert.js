export default class Alert {
  constructor() {
    this.path = "alerts.json";
  }

  async init() {
    const alerts = await this.fetchAlerts();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async fetchAlerts() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  }

  renderAlerts(alerts) {
    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    alerts.forEach((alertData) => {
      const alertItem = document.createElement("div");
      alertItem.classList.add("alert-item");
      
      // Setting dynamic colors from the JSON
      alertItem.style.backgroundColor = alertData.background;
      alertItem.style.color = alertData.color;
      
      // Styling via JS to ensure layout works
      alertItem.style.display = "flex";
      alertItem.style.justifyContent = "space-between";
      alertItem.style.padding = "10px 20px";
      alertItem.style.marginBottom = "5px";

      
      const p = document.createElement("p");
      p.innerText = alertData.message;
      p.style.margin = "0";

      // The Close Button
      const closeBtn = document.createElement("span");
      closeBtn.innerHTML = "&times;";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.fontWeight = "bold";
      closeBtn.style.fontSize = "20px";

      closeBtn.addEventListener("click", () => {
        alertItem.remove();
        if (alertList.children.length === 0) {
          alertList.remove();
        }
      });

      alertItem.appendChild(p);
      alertItem.appendChild(closeBtn);
      alertList.appendChild(alertItem);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertList);
    }
  }
}