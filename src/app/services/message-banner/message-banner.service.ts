import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBannerService {
  public displayBanner(title: string, message: string, acceptText = "I Accept", rejectText = "Disagree") {
    const bannerElement = document.createElement("div");
    bannerElement.setAttribute("id", "banner")
    bannerElement.setAttribute("style", "transition: top ease-in-out 300ms; width: 100%; background-color: #D6EBF3; position: absolute; top: 0; padding-bottom: 15px; text-align: center; border: 2px solid #AED9E8")

    const titleElement = document.createElement("h2");
    titleElement.setAttribute("style", "font-weight: 400")
    titleElement.innerText = title;

    const messageElement = document.createElement("p");
    messageElement.innerText = message;

    const rejectButton = document.createElement("button");
    rejectButton.setAttribute("style", "margin: 0 8px; cursor: pointer; background-color: white;color: #479CBA;border-radius: 15px;padding: 5px 15px;font-size: 18px;border: 1px solid #479CBA; box-shadow: 0 0 3px #479CBA;")
    rejectButton.setAttribute("id", "rejectButton")
    rejectButton.innerText = rejectText;
    rejectButton.addEventListener("click", () => {
      bannerElement.style.setProperty("top", "-250px")
      setTimeout(() => {
        bannerElement.remove();
      }, 500);
    })

    const accpectButton = document.createElement("button");
    accpectButton.setAttribute("style", "margin: 0 8px; cursor: pointer; background-color: #479CBA;color: white;border-radius: 15px;padding: 5px 15px;font-size: 18px;border: 1px solid #479CBA; box-shadow: 0 0 3px #479CBA;")
    accpectButton.setAttribute("id", "accpectButton")
    accpectButton.innerText = acceptText;
    accpectButton.addEventListener("click", () => {
      bannerElement.style.setProperty("top", "-250px")
      setTimeout(() => {
        bannerElement.remove();
      }, 500);
    })


    bannerElement.appendChild(titleElement)
    bannerElement.appendChild(messageElement)
    bannerElement.appendChild(rejectButton)
    bannerElement.appendChild(accpectButton)

    document.getElementById("content")?.append(bannerElement)
  }
}
