// Variables for task details
let ID = -1;
let status = "";
let checkbox = [];
let subtasksClosed = -1;

/**
 * Opens the Add Task popup for creating a new task.
 *
 * @param {string} status - The task status.
 */
async function openAddTaskPopup(status) {
    taskContactList = [];
    await loadUsers();
    ID = -1;
    let popup = document.getElementById('popup');
    let body = document.getElementById('body');
    popup.classList.remove('d-none');
    popup.classList.add('d-flex');
    body.classList.add('overflow-hidden');
    statusTask = status;
    renderPopUp(popup);
}

/**
 * Opens the Add Task popup for editing an existing task.
 *
 * @param {number} idOld - The ID of the task to edit.
 * @param {string} title - The task title.
 * @param {string} description - The task description.
 * @param {string} dueDate - The due date of the task.
 * @param {string} prio - The task priority.
 * @param {Array<string>} firstNames - Array of first names of assigned contacts.
 * @param {Array<string>} lastNames - Array of last names of assigned contacts.
 * @param {Array<string>} colors - Array of colors of assigned contacts.
 * @param {string} status - The task status.
 * @param {string} category - The task category.
 * @param {Array<boolean>} checkboxOld - Array of task checkboxes.
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 * @param {number} subtasksClosedOld - The number of closed subtasks.
 */
async function openAddTaskPopupEdit(idOld, title, description, dueDate, prio, firstNames, lastNames, colors, status, category, checkboxOld, subtasksOld, subtasksClosedOld) {
    await loadUsers();
    preparePopup();
    setTaskDetails(title, description);
    setupContactDropdown(firstNames, lastNames, colors);
    setDateAndPriority(dueDate, prio);
    setupCategoryDropdown(category);
    setupSubtasks(subtasksOld);
    setTaskStatusAndCheckbox(idOld, status, checkboxOld);
    setSubtaskClosed(subtasksClosedOld);
}

/**
 * Prepares the Add Task popup by showing it, disabling body scroll, and rendering the popup.
 */
function preparePopup() {
    let popup = document.getElementById('popup');
    let body = document.getElementById('body');
    showPopup(popup);
    disableBodyScroll(body);
    renderPopUp(popup);
}

/**
 * Sets up the contact dropdown menu with provided first names, last names, and colors.
 *
 * @param {Array<string>} firstNames - Array of first names of assigned contacts.
 * @param {Array<string>} lastNames - Array of last names of assigned contacts.
 * @param {Array<string>} colors - Array of colors of assigned contacts.
 */
function setupContactDropdown(firstNames, lastNames, colors) {
    openDropdownMenuEdit('contact', firstNames, lastNames, colors);
}

/**
 * Sets the due date and priority for a task. If no priority is provided, it defaults to "no".
 *
 * @param {string} dueDate - The due date of the task.
 * @param {string} prio - The task priority.
 */
function setDateAndPriority(dueDate, prio) {
    setDate(dueDate);
    if (prio == undefined) {
        prio = "no";
    }
    getTaskPrio(prio);
}

/**
 * Sets up the category dropdown menu with a provided category.
 *
 * @param {string} category - The task category.
 */
function setupCategoryDropdown(category) {
    openDropdownMenuEditCategory('category', category);
}

/**
 * Sets up subtasks with provided subtask descriptions.
 *
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 */
function setupSubtasks(subtasksOld) {
    setSubtasks(subtasksOld);
}

/**
 * Sets a task's status and checkboxes with provided task ID, status, and checkboxes.
 *
 * @param {number} idOld - The ID of the task.
 * @param {string} status - The task status.
 * @param {Array<boolean>} checkboxOld - Array of task checkboxes.
 */
function setTaskStatusAndCheckbox(idOld, status, checkboxOld) {
    ID = idOld;
    checkbox = checkboxOld;
    setStatus(status);
}

/**
 * Sets whether a subtask is closed with a provided subtask closed status.
 *
 * @param {number} subtasksClosedOld - The number of closed subtasks.
 */
function setSubtaskClosed(subtasksClosedOld) {
    subtasksClosed = subtasksClosedOld;
}

/**
 * Shows the Add Task popup.
 *
 * @param {HTMLElement} popup - The popup element.
 */
function showPopup(popup) {
    popup.classList.remove('d-none');
    popup.classList.add('d-block');
}

/**
 * Disables body scrolling to prevent scrolling when the popup is open.
 *
 * @param {HTMLElement} body - The body element.
 */
function disableBodyScroll(body) {
    body.classList.add('overflow-hidden');
}

/**
 * Sets the task title and description in the input fields.
 *
 * @param {string} title - The task title.
 * @param {string} description - The task description.
 */
function setTaskDetails(title, description) {
    document.getElementById('add_task_title').value = title;
    document.getElementById('add_task_description').value = description;
}

/**
 * Sets the due date in the input field.
 *
 * @param {string} dueDate - The due date of the task
 */
function setDate(dueDate) {
    document.getElementById('add_task_input_date').value = dueDate;
}

/**
 * Sets the subtasks for the task.
 *
 * @param {Array<string>} subtasksOld - Array of subtask descriptions.
 */
function setSubtasks(subtasksOld) {
    subtasks = subtasksOld;
    checkSubtasks(subtasks);
}

/**
 * Sets the task status.
 *
 * @param {string} status - The task status.
 */
function setStatus(status) {
    statusTask = status;
}

/**
 * Renders the Add Task popup.
 *
 * @param {HTMLElement} popup - The popup element.
 */
function renderPopUp(popup) {
    popup.innerHTML = /*html*/`
    <div class="animation-maincontainer" id="added-to-board-animation">
        <div class="animation-added-to-board" >
            Task added to board <img src="../img/board.png" alt="board">
        </div>
    </div>
    <div class="popup-background" onclick="closePopup()">
        <div class="popup-content" onclick="doNotClose(event)">

    <div class="maincontainer-addTask">
        <div class="bg-grey">
            <div>
                <div w3-include-html="../html/header.html"></div>
            </div>

            <div class="add_task_h1">Add Task</div>
            <!-- ADD TASK CONTAINER -->

            <div class="add_task_container">
                <!-- TASK TITLE -->
                <div class="add_task_left">
                    <div class="title fd_column">
                        <span>Title<span class="required-star">*</span></span>
                        <input class="task_input_field_styling" type="text" placeholder="Enter a title" maxlength="20"
                            id="add_task_title">
                        <div id="red-warning-txt-title"></div>
                    </div>
                    <!-- TASK DESCRIPTION -->
                    <div class="description fd_column">
                        <span>Description<span class="required-star">*</span></span>
                        <textarea class="task_input_field_styling" name="description" id="add_task_description"
                            cols="30" rows="5" placeholder="Enter a description"  maxlength="100"></textarea>
                        <div id="red-warning-txt-description"></div>
                    </div>
                    <!-- USER SELECTION -->
                    <div class="category fd_column">
                        <span>Assigned to</span>
                        <div class="category-select-down">
                            <div class="task_input_field_styling dropdown" id="dropdown">Select contacts to assign</div>
                            <img id="arrow-contact" class="category-down" onclick="openDropdownMenuIndex('contact')"
                                src="../img/addTask/category-down.svg" alt="open dropdown menu">
                        </div>
                        <ul class="task_input_field_styling dropdown-content" id="add_task_contact_select">
                            <div id="rendering-addTask-contacts">
                                <li id="li-contact"></li>
                            </div>
                            <li class="add-new-contact-btn" onclick="addChosenContactsToTask()">Select contacts <img
                                    src="../img/person_add.png" alt=""></li>
                        </ul>
                        <div id="red-warning-txt-contact"></div>
                        <div class="show-selected-contacts" id="selected-contacts"></div>
                    </div>
                </div>
                <!-- SEPERATOR -->
                <div class="seperator fd_column"></div>
                <div class="add_task_right">
                    <!-- TASK DATE -->
                    <div class="date fd_column">
                        <span>Due date <span class="required-star">*</span></span>
                        <input class="task_input_field_styling" type="date" onclick="setDateToday()"
                            id="add_task_input_date">
                        <div id="red-warning-txt-date"></div>
                    </div>
                    <!-- TASK PRIO -->
                    <div class="prio fd_column">
                        <span>Prio<span class="required-star">*</span></span>
                        <div id="red-warning-txt-prio"></div>
                        <div class="prio-btns-container">
                            <div onclick="getTaskPrio('urgent')" id="prio_urgent" class="prio-btn">Urgent <img
                                    src="../img/addTask/urgent_prio.png" alt="urgent">
                            </div>
                            <div onclick="getTaskPrio('medium')" id="prio_medium" class="prio-btn">Medium <img
                                    src="../img/addTask/medium_prio.png" alt="medium">
                            </div>
                            <div onclick="getTaskPrio('low')" id="prio_low" class="prio-btn">Low <img
                                    src="../img/addTask/low_prio.png" alt="low"></div>
                        </div>

                    </div>
                    <!-- TASK CATEGORY -->
                    <div class="category fd_column">
                        <span>Category</span>
                        <div class="category-select-down">
                            <div class="task_input_field_styling dropdown" id="task-category">Select task category</div>
                            <img id="arrow-category" class="category-down" onclick="openDropdownMenuIndex('category')"
                                src="../img/addTask/category-down.svg" alt="open dropdown menu">
                        </div>
                        <ul class="task_input_field_styling dropdown-content" id="add_task_category_select">
                            <li id="Technical Task" onclick="handleCategoryChange(id)">Technical Task</li>
                            <li id="User Story" onclick="handleCategoryChange(id)">User Story</li>
                        </ul>
                    </div>
                    <!-- SUBTASK -->
                    <div class="subtasks fd_column">
                        <span>Subtasks</span>
                        <div class="subtask_container">
                            <input class="task_input_field_styling" type="text" name="" id="add_task_input_subtask"
                                maxlength="20" placeholder="Add new subtask"><img class="subtask_plus"
                                onclick="checkNewSubtask()" src="../img/addTask/subtask_plus.png" alt="add Subtask">
                        </div>
                        <div id="red-warning-txt"></div>
                        <div id="rendered-subtask-container">
                            <div class="show-subtasks" id="show-subtasks">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- BUTTONS CLEAR AND ADD TASK -->
            <footer>
                <div class="buttons-clear-create">
                    <span><span class="required-star">*</span>This field is required!</span>
                    <div class="clear-create-container">
                        <div onclick="clearTask(event)" class="clear-btn btn">Clear <img
                                src="../img/addTask/add_task_cancel.png" alt="check">
                        </div>
                        <button id="create-btn" class="create-btn btn" onclick="checkAllRequiredFields()">Create
                            Task <img src="../img/addTask/add_task_check.png" alt="cancel"></button>
                    </div>
                </div>
             </div>
        </div>
    </div>

    </div>
    `;
}

/**
 * Closes the Add Task popup and resets the task ID.
 */
function closePopup() {
    ID = -1;
    let body = document.getElementById('body');
    let popup = document.getElementById('popup-background');
    popup.classList.add('d-none');
    body.classList.remove('overflow-hidden');
}

/**
 * Prevents the popup from closing when clicking on it.
 *
 * @param {Event} event - The click event.
 */
function doNotClose(event) {
    event.stopPropagation();
}
