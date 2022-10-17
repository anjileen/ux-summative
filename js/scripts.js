// Back button
if (document.getElementById("top-bar__arrow")) {
    document.getElementById("top-bar__arrow").onclick = function () { history.back() };
}

// Language button
if (document.getElementById("lang-btn")) {
    document.getElementById("lang-btn").onclick = function () { toggleLang() };
}


// If Maori language chosen
if (sessionStorage.language === "maori") {
    var englang = document.querySelectorAll(".english");
    var maorilang = document.querySelectorAll(".maori");

    // Show Maori language, and hide English

    for (let i = 0; i < maorilang.length; i++) {
        maorilang[i].style.display = "block";
    }

    for (let i = 0; i < englang.length; i++) {
        englang[i].style.display = "none";
    }
}


// Function for button to change language
function toggleLang() {
    var englang = document.querySelectorAll(".english");
    var maorilang = document.querySelectorAll(".maori");

    // If Maori text showing and button clicked, hide Maori and show English
    if (maorilang[0].style.display === "block" && englang[0].style.display === "none") {

        // Set language to English
        sessionStorage.language = "english";

        for (let i = 0; i < englang.length; i++) {
            englang[i].style.display = "block";
        }

        for (let i = 0; i < maorilang.length; i++) {
            maorilang[i].style.display = "none";
        }
    }
    // Otherwise, show Maori language, and hide English
    else {
        // Set language to Maori
        sessionStorage.language = "maori";

        for (let i = 0; i < maorilang.length; i++) {
            maorilang[i].style.display = "block";
        }

        for (let i = 0; i < englang.length; i++) {
            englang[i].style.display = "none";
        }
    }
}


// Selected Table Button
var tableBtns = document.querySelectorAll(".tables__button");

if (tableBtns) {
    // For each button add event listener
    for (i = 0; i < tableBtns.length; i++) {
        tableBtns[i].addEventListener("click", function (event) {
            // Remove previously selected
            let previousSelected = document.querySelectorAll(".selected")
            for (i = 0; i < previousSelected.length; i++) {
                previousSelected[i].classList.remove("selected");
            }
            // Add selected class to button clicked
            event.target.classList.add("selected");
        })
    }
}

// Plus Button
var plusBtn = document.getElementsByClassName("meals__plus-button");
// Minus Button
var minusBtn = document.getElementsByClassName("meals__minus-button");

// Price
var price = 0;

// Curent Total
var currentTotal = 0;

// Final total
var total = 0;

//Total price 
if (document.getElementById("bottom-bar__price")) {
    var finalTotal = Number(document.getElementById("bottom-bar__price").innerText);
    if (isNaN(sessionStorage.total) || sessionStorage.total < 0) {
        sessionStorage.total = 0;
    }
    if (sessionStorage.quantity == "undefined" || isNaN(sessionStorage.quantity)) {
        sessionStorage.quantity = 0;
    }
}

// Items
if (sessionStorage.quantity != undefined) {
    var items = Number(sessionStorage.quantity.length - 1);
}

// Quantity Array
var quantityArray = [];

// Summary Array
var summaryArray = [];

// Summary page 
var cartPage = document.getElementById("summary-table");
var cartSummary = document.getElementById("cart");
var priceSummary = document.getElementById("final-total");
var itemsTotal = document.getElementById("quantities");

if (sessionStorage.summary == undefined) {
    sessionStorage.summary = " ";
}


// On page with summary element
if (priceSummary !== null) {
    // Display price
    priceSummary.textContent = "Total: $" + Number(sessionStorage.total).toFixed(2);
}

// If on page with total price element
if (document.getElementById("bottom-bar__price")) {
    // If nothing in cart
    if (isNaN(document.getElementById("bottom-bar__price").innerText)) {
        document.getElementById("bottom-bar__price").innerText = 0.00;
    }
    // Display price
    document.getElementById("bottom-bar__price").innerText = Number(sessionStorage.total).toFixed(2);
}

// If on Cart summary page
if (cartPage) {
    var rows = "";
    var allRows = "";

    // Push local storage summary to summary array
    summaryArray.push(sessionStorage.summary);
    // Split into  separate arrays
    rows = String(summaryArray).split(";");

    // For each array, split into another array with meal name, price, quantity
    for (j = (rows.length - 1); j >= 0; j--) {
        if (rows.length > 2) {
            rows[j] = rows[j].split(",");
        }
        // Meal name
        let food = rows[j][0];
        // Add rows
        allRows += "<tr><td>" + String(food).replace(/ml/g, " ") + "</td><td>" + "$" + Number(rows[j][1]).toFixed(2) + "</td><td>" + "1" + "</td><td>" + "<div class='close'" + "</td></tr>";
    }

    // If no items in cart
    if (summaryArray == " ") {
        cartSummary.innerHTML = "No items in cart";
    } else {
        // Display rows on page
        cartSummary.innerHTML = allRows;

        // Assign ids to rows
        let tr = document.querySelectorAll("tr");
        for (i = 0; i < tr.length; i++) {
            tr[i].setAttribute("id", i + 1);
        }

        // Remove button
        var x = document.querySelectorAll(".close");
        // For each button add click event listener
        for (j = 0; j < x.length; j++) {
            x[j].addEventListener("click", function (event) {
                // When clicked add class remove
                event.target.parentNode.parentNode.classList.add("remove");

                // Empty summary array
                summaryArray = [];
                // Push session storage to array
                summaryArray.unshift(sessionStorage.summary);

                // Decrease item total count
                items = items - 1;
                itemsTotal.textContent = "Items: " + items;

                // Get price to remove from total
                let priceRemove = event.target.parentNode.parentNode.children[1];
                priceRemove = priceRemove.innerText.replace("$", "");
                priceRemove = parseFloat(priceRemove);

                // Prevent going to negative number
                if (sessionStorage.total < 0) {
                    sessionStorage.total = 0;
                }

                // Get current total
                let currentTotal = Number(sessionStorage.total);
                // Remove price from current total
                finalTotal = currentTotal - Number(priceRemove);
                // Set new total in session storage
                sessionStorage.total = finalTotal;

                // Display total on page
                priceSummary.innerText = "Total: $" + finalTotal.toFixed(2);
                document.getElementById("bottom-bar__price").innerText = Number(sessionStorage.total).toFixed(2);
                // Display item count on page
                sessionStorage.quantity = sessionStorage.quantity.slice(0, -1);

                itemsTotal.innerText = "Items: " + Number(sessionStorage.quantity.length - 1);

            })
        }
    }
}

// If on summary page
if (itemsTotal) {
    // Display total items
    itemsTotal.innerText = "Items: " + Number(rows.length - 1);
}

var quantity = document.getElementsByClassName("qty");

// Increment function

// For each increment button
for (let i = 0; i < plusBtn.length; i++) {
    let button = plusBtn[i];
    // Add click event listener
    button.addEventListener("click", function (event) {

        let btnClicked = event.target;

        // Quantity input
        let qtyInput = btnClicked.parentElement.parentElement.children[1];

        // Price
        price = btnClicked.parentElement.parentElement.parentElement;
        price = parseFloat(price.textContent);

        // Current total
        currentTotal = document.getElementById("bottom-bar__price").innerText;
        currentTotal = Number(currentTotal);

        // Add new price to current total
        total = currentTotal + price;

        // Qty
        let qtyElement = document.getElementsByClassName("qty")[i];

        let itemsSum = parseInt(qtyElement.value) + 1;
        qtyElement.setAttribute("value", itemsSum);
        qtyInput.value = itemsSum;

        quantityArray.push(qtyElement);

        sessionStorage.quantity += 1;

        // Meal element
        let meal = btnClicked.parentElement.parentElement.parentElement;
        let mealName = meal.innerText.replace(/\d|\n|[.]/g, " ").trim();

        // Summary
        let summary = [mealName, price, itemsSum + ";"];
        sessionStorage.summary = summary + sessionStorage.summary;

        // Add to summary array
        summaryArray.unshift(sessionStorage.summary);

        // Set price         
        sessionStorage.total = Number(sessionStorage.total) + price;

        // Display total price
        document.getElementById("bottom-bar__price").innerText = total.toFixed(2);

    })
}

// Decrement function

// For each decrement button
for (let i = 0; i < minusBtn.length; i++) {
    let button = minusBtn[i];
    // Add click event listener
    button.addEventListener("click", function (event) {

        let btnClicked = event.target;

        // Quantity input
        let qtyInput = btnClicked.parentElement.parentElement.children[1];

        // Price
        price = btnClicked.parentElement.parentElement.parentElement;
        // Parse price as number
        price = parseFloat(price.textContent);

        // Current total
        currentTotal = document.getElementById("bottom-bar__price").innerText;
        currentTotal = Number(currentTotal);

        let total;
        // If total greater than zero, then decrease total
        if (currentTotal - price > 0) {
            total = currentTotal - price;
        }

        // Qty

        let qtyElement = document.getElementsByClassName("qty")[i];

        let itemsSum = parseInt(qtyElement.value) - 1;
        if (parseInt(qtyElement.value) > 0) {

            qtyElement.setAttribute("value", itemsSum);
            qtyInput.value = itemsSum;
        }

        sessionStorage.quantity = sessionStorage.quantity.slice(0, -1);
        quantityArray.pop();

        // Meal element
        let meal = btnClicked.parentElement.parentElement.parentElement;
        let mealName = meal.innerText.replace(/\d|\n|[.]/g, " ").trim();

        // Summary
        // Item to remove
        let removed = mealName + "," + price + ",1;";
        // Remove from session storage
        sessionStorage.summary = sessionStorage.summary.replace(removed, "");

        // If no quantity, quantity is 0
        if (quantityArray.length == 0) {
            qtyInput.value = 0;
        }

        // Set price         
        if (Number(document.getElementById("bottom-bar__price").textContent) > 0) {
            sessionStorage.total = Number(sessionStorage.total) - price;
        }

        // Prevent going to negative numbers
        if (itemsSum > 0) {
            qtyInput.value = itemsSum;
            document.getElementById("bottom-bar__price").textContent = Number(total).toFixed(2);
        } else {
            qtyInput.value = 0;
            document.getElementById("bottom-bar__price").textContent = Number(0).toFixed(2);
        }

    })
}


// Feedback section
if (document.getElementById("feedback-btn")) {
    // When feedback button clicked
    document.getElementById("feedback-btn").onclick = function () {
        // Hide feedback button
        document.getElementById("feedback-btn").style.display = "none";
        // Show feedback section
        document.getElementById("feedback-section").style.display = "block";
    }
}

// Rating button 
if (document.getElementById("feedback-section__rating-btn")) {
    // When submit rating button clicked
    document.getElementById("feedback-section__rating-btn").onclick = function () {
        // Show submit success message
        document.getElementById("submit-message").style.display = "block";
    }
}

// Rating stars section
var starRating = document.getElementsByClassName("feedback-section");

// If on rating page
if (starRating) {
    // Query all stars
    let ratingStars = document.querySelectorAll(".feedback-section__star");
    // For each star
    for (i = 0; i < ratingStars.length; i++) {
        /// When clicked
        ratingStars[i].addEventListener("click", function (event) {
            // Add blue background
            event.target.classList.toggle("feedback-section__star--blue-star");

        })
    }
}

// New Order button
var newOrder = document.getElementById("new-order-btn");
if (newOrder) {
    // Clear session storage
    newOrder.onclick = function () { sessionStorage.clear() };
}

