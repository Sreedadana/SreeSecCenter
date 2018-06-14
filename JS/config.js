'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var config = {
    'authHistory': undefined,
    'authSession': undefined,
    'authHistoryView': undefined,
    'authSessionView': undefined,
    'participants': undefined,
    'participantsView': undefined,
    'participantsForm': undefined,
    'participantsFormView': undefined
};

function authHistoryAPI() {
    fetch('../mock-data/Config.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataSource = data.dataSources;
        var view = data.views;
        config.authHistory = dataSource.filter(function (item) {
            return item.id == 'authHistory';
        })[0];
        config.authHistoryView = view.filter(function (item) {
            return item.id == 'authHistory';
        })[0];
        var authHContent = document.querySelector("#authHistory-content");
        var displayList = getTableContent(config.authHistory.mockDataSet, config.authHistoryView.columns, 'authHistory');
        var displayHeader = getTableHeader(config.authHistoryView.columns, 'authHistory');

        var table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered');
        var tHead = document.createElement('thead');
        tHead.append(displayHeader);
        table.append(tHead);
        table.append(displayList);

        if (authHContent) {
            authHContent.innerHTML = '<span style="display:none;"></span>';
            authHContent.append(table);
        }
    });
}

function authSessionAPI() {
    fetch('../mock-data/Config.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataSource = data.dataSources;
        var view = data.views;
        config.authSession = dataSource.filter(function (item) {
            return item.id == 'authSession';
        })[0];
        config.authSessionView = view.filter(function (item) {
            return item.id == 'authSession';
        })[0];
        var authSContent = document.querySelector("#authSession-content");
        var displayList = getTableContent(config.authSession.mockDataSet, config.authSessionView.columns, 'authSession');
        var displayHeader = getTableHeader(config.authSessionView.columns, 'authSession');

        var table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered');
        var tHead = document.createElement('thead');
        tHead.append(displayHeader);
        table.append(tHead);
        table.append(displayList);

        if (authSContent) {
            authSContent.innerHTML = '<span style="display:none;"></span>';
            authSContent.append(table);
        }
    });
}

function participantsAPI() {
    fetch('../mock-data/Participants.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataSource = data.dataSources;
        var view = data.views;
        config.participants = dataSource.filter(function (item) {
            return item.id == 'participants';
        })[0];
        config.participantsView = view.filter(function (item) {
            return item.id == 'participants';
        })[0];

        var participantsContent = document.querySelector("#participants-content");
        var displayHeader = getTableHeader(config.participantsView.columns, 'participants');

        var displayList = getTableContent(config.participants.mockDataSet, config.participantsView.columns, 'participants');

        var table = document.createElement('table');
        table.setAttribute('class', 'table table-bordered');

        var tHead = document.createElement('thead');

        tHead.append(displayHeader);
        table.append(tHead);
        table.append(displayList);

        var createBtn = document.createElement('button');
        createBtn.setAttribute('type', 'button');
        createBtn.innerHTML = 'CREATE A RECORD';
        createBtn.addEventListener('click', createHandler);

        function createHandler() {
            var newObject = getEmptyObject();
            config.participants.mockDataSet.push(newObject);
            appendEmptyRow(table.querySelectorAll('tbody')[0], config.participantsView.columns);
        }

        var submitBtn = document.createElement('button');
        submitBtn.setAttribute('type', 'button');
        submitBtn.innerHTML = 'SUBMIT';
        submitBtn.addEventListener('click', submitHandler);

        function submitHandler() {
            var editedRow = displayList.querySelectorAll('tr[data-editable=true')[0];
            var index = editedRow.getAttribute('data-index');
            var columns = config.participantsView.columns;
            columns.map(function (column, columnIndex) {
                submitUpdatedData(config.participants.mockDataSet[index][column.id], column, editedRow, index);
            });
            var updatedData = getRowFields(config.participants.mockDataSet[index], index, columns, 'participants');
            editedRow.innerHTML = updatedData.innerHTML;
            editedRow.removeAttribute('data-editable');
            editedRow.removeAttribute('data-index');
        }

        if (participantsContent) {
            participantsContent.innerHTML = '';
            participantsContent.append(table);
            participantsContent.append(createBtn);
            participantsContent.append(submitBtn);
        }
    });
}

function participantsFormAPI() {
    fetch('../mock-data/Participants_form.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        var dataSource = data.dataSources;
        var view = data.views;
        config.participantsForm = dataSource.filter(function (item) {
            return item.id == 'participants';
        })[0];
        config.participantsFormView = view.filter(function (item) {
            return item.id == 'formParticipants';
        })[0];

        var participantsFormContent = document.querySelector("#participantsForm-content");

        if (participantsFormContent) {
            participantsFormContent.innerHTML = '';
            normalFormPage(participantsFormContent);
        }
    });
}

function appendEmptyRow(container, columns) {
    var row = document.createElement('tr');
    getRowFormFields(config.participants.mockDataSet[config.participants.mockDataSet.length - 1], columns, row, config.participants.mockDataSet.length - 1);
    container.append(row);
}

function getEmptyObject() {
    var emptyObj = {
        "issuerParty": "",
        "taxId": "",
        "editable": false,
        "employment": {
            "employeeNumber": "",
            "hireDate": "",
            "terminationDate": ""
        },
        "fullName": {
            "given": "",
            "middle": "",
            "family": ""
        },
        "addresses": [{
            "context": "home",
            "lineOne": "",
            "lineTwo": "",
            "city": "",
            "countrySubdivision": "",
            "postalCode": "",
            "countryCode": ""
        }, {
            "context": "work",
            "lineOne": "",
            "lineTwo": "",
            "city": "",
            "countrySubdivision": "",
            "postalCode": "",
            "countryCode": ""
        }],
        "phoneNumbers": [{
            "context": "home",
            "digits": ""
        }, {
            "context": "work",
            "digits": ""
        }],
        "emailAddresses": [{
            "context": "home",
            "address": ""
        }],
        "id": "",
        "promoted": false,
        "birthDate": "",
        "uuid": ""
    };
    return emptyObj;
}

function getTableHeader(columns, type) {
    var tHeadRow = document.createElement('tr');
    if (type === 'participants') {
        var tableActionHead = document.createElement('th');
        tableActionHead.innerHTML = '';
        tHeadRow.append(tableActionHead);
    }
    columns.map(function (column, columnIndex) {
        var tableHead = document.createElement('th');
        tableHead.innerHTML = column.label;
        tHeadRow.append(tableHead);
    });
    return tHeadRow;
}

function getTableContent(dataset, columns, type) {
    var tBody = document.createElement('tbody');

    dataset.map(function (record, recordIndex) {
        var displayRows = getRowFields(record, recordIndex, columns, type);
        tBody.append(displayRows);
    });
    return tBody;
}

function getRowFields(record, index, columns, type) {
    var tableRow = document.createElement('tr');
    if (type === 'participants') {
        var updateRowHandler = function updateRowHandler() {
            var updatedRow = getRowFormFields(config.participants.mockDataSet[index], columns, this.closest('tr'), index);
        };

        var deleteRowHandler = function deleteRowHandler() {
            config.participants.mockDataSet.splice(index, 1);
            this.closest('tr').remove();
        };

        var actionCell = document.createElement('td');

        var updateButton = document.createElement('button');
        updateButton.setAttribute('type', 'button');
        updateButton.innerHTML = 'UPDATE';
        updateButton.addEventListener('click', updateRowHandler);

        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.addEventListener('click', deleteRowHandler);
        deleteButton.innerHTML = 'DELETE';

        actionCell.append(updateButton);
        actionCell.append(deleteButton);
        tableRow.append(actionCell);
    }
    columns.map(function (column, columnIndex) {
        var tableCell = document.createElement('td');
        var fieldData = record[column.id];
        if (type === 'participants') {
            tableCell.innerHTML = getDisplayer(fieldData, column);
        } else {
            tableCell.innerHTML = fieldData;
        }
        tableRow.append(tableCell);
    });
    return tableRow;
}

function getDisplayer(fieldData, column) {
    var dataType = typeof fieldData === 'undefined' ? 'undefined' : _typeof(fieldData);
    switch (dataType) {
        case 'boolean':
            return fieldData;
        case 'object':
            var displayer = column.displayer.pattern.split('\n').map(function (d) {
                return d.slice(1, -1);
            });
            var seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                var homeChecked = column.homeChecked;
                var obj = void 0;
                if (homeChecked) {
                    obj = fieldData.filter(function (a) {
                        return a.context == 'home';
                    })[0];
                    if (!obj) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'work';
                        })[0];
                    }
                } else {
                    obj = fieldData.filter(function (a) {
                        return a.context == 'work';
                    })[0];
                    if (!obj) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'home';
                        })[0];
                    }
                }
                displayer = displayer.map(function (i) {
                    return obj[i];
                }).filter(function (j) {
                    return j;
                }).join(seperator);
            } else {
                displayer = displayer.map(function (i) {
                    return fieldData[i];
                }).filter(function (j) {
                    return j;
                }).join(seperator);
            }
            return displayer;
        default:
            return fieldData;
    }
}

function getFormDisplayer(fieldData, column, currentRow) {
    var dataType = typeof fieldData === 'undefined' ? 'undefined' : _typeof(fieldData);
    var tableCell = document.createElement('td');
    var rootDiv = document.createElement('div');
    switch (dataType) {
        case 'boolean':
            updateForm(rootDiv, '', column.id, column.label, fieldData, dataType, false);
            tableCell.append(rootDiv);
            currentRow.append(tableCell);
            return fieldData;
        case 'object':
            var displayer = column.displayer.pattern.split('\n').map(function (d) {
                return d.slice(1, -1);
            });
            var seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                var homeChecked = column.homeChecked;
                var obj = void 0;
                if (homeChecked) {
                    obj = fieldData.filter(function (a) {
                        return a.context == 'home';
                    })[0];
                    if (!obj) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'work';
                        })[0];
                    }
                } else {
                    obj = fieldData.filter(function (a) {
                        return a.context == 'work';
                    })[0];
                    if (!obj) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'home';
                        })[0];
                    }
                }
                rootDiv.setAttribute('class', 'form-group row');
                Object.keys(displayer).map(function (i) {
                    updateForm(rootDiv, displayer[i], column.id, column.label, obj[displayer[i]], dataType, false);
                });

                tableCell.append(rootDiv);
                currentRow.append(tableCell);
            } else {
                rootDiv.setAttribute('class', 'form-group row');
                Object.keys(displayer).map(function (i) {
                    updateForm(rootDiv, displayer[i], column.id, column.label, fieldData[displayer[i]], dataType, false);
                });

                tableCell.append(rootDiv);
                currentRow.append(tableCell);
            }
            return displayer;
        default:
            updateForm(rootDiv, '', column.id, column.label, fieldData, dataType, false);
            tableCell.append(rootDiv);
            currentRow.append(tableCell);
            return fieldData;
    }
}

function submitUpdatedData(fieldData, column, currentRow, index) {
    var dataType = typeof fieldData === 'undefined' ? 'undefined' : _typeof(fieldData);
    var currentElement = void 0;
    switch (dataType) {
        case 'boolean':
            currentElement = currentRow.querySelectorAll('#' + column.id)[0];
            config.participants.mockDataSet[index][column.id] = currentElement.checked;
            return fieldData;
        case 'object':
            var displayer = column.displayer.pattern.split('\n').map(function (d) {
                return d.slice(1, -1);
            });
            var seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                var homeChecked = column.homeChecked;
                Object.keys(displayer).map(function (i) {
                    currentElement = currentRow.querySelectorAll('#' + column.id + '-' + displayer[i])[0];
                    if (homeChecked) {
                        config.participants.mockDataSet[index][column.id].filter(function (a) {
                            if (a.context === 'home') {
                                a[displayer[i]] = currentElement.value;
                            }
                        });
                    } else {
                        config.participants.mockDataSet[index][column.id].filter(function (a) {
                            if (a.context === 'work') {
                                a[displayer[i]] = currentElement.value;
                            }
                        });
                    }
                });
            } else {
                Object.keys(displayer).map(function (i) {
                    currentElement = currentRow.querySelectorAll('#' + column.id + '-' + displayer[i])[0];
                    config.participants.mockDataSet[index][column.id][displayer[i]] = currentElement.value;
                });
            }
            return fieldData;
        default:
            currentElement = currentRow.querySelectorAll('#' + column.id)[0];
            config.participants.mockDataSet[index][column.id] = currentElement.value;
            return fieldData;
    }
}

function updateForm(rootDiv, subId, columnId, columnLabel, value, type, isFormPage) {
    var inputDiv = void 0;
    var labelForCell = void 0;
    if (!isFormPage) {
        labelForCell = document.createElement('label');
        labelForCell.setAttribute('class', 'col-sm-2 col-form-label');
        if (type === 'object') {
            labelForCell.setAttribute('for', columnLabel + '-' + subId);
            labelForCell.innerHTML = columnLabel + '-' + subId;
        } else {
            labelForCell.setAttribute('for', columnLabel);
            labelForCell.innerHTML = columnLabel;
        }
        inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'col-sm-10');
    } else {
        inputDiv = document.createElement('div');
        labelForCell = document.createElement('span');
        if (type === 'object') {
            labelForCell.innerHTML = subId;
        } else {
            labelForCell.innerHTML = '';
        }
    }

    var inputElement = document.createElement('input');
    if (type === 'boolean') {
        inputElement.setAttribute('id', columnId);
        inputElement.setAttribute('name', columnId);
        inputElement.setAttribute('type', 'checkbox');
        if (value == 'true') {
            inputElement.setAttribute('checked', true);
        } else {
            inputElement.removeAttribute('checked');
        }
    } else {
        inputElement.setAttribute('type', 'text');
        if (type === 'object') {
            inputElement.setAttribute('id', columnId + '-' + subId);
            inputElement.setAttribute('name', columnId + '-' + subId);
            inputElement.setAttribute('placeholder', columnLabel + '-' + subId);
        } else {
            inputElement.setAttribute('id', columnId);
            inputElement.setAttribute('name', columnId);
            inputElement.setAttribute('placeholder', columnLabel);
        }
        inputElement.setAttribute('value', value);
    }
    if (!isFormPage) {
        inputDiv.append(inputElement);
        rootDiv.append(labelForCell);
        rootDiv.append(inputDiv);
    } else {
        inputDiv.append(inputElement);
        rootDiv.append(labelForCell);
        rootDiv.append(inputDiv);
    }
}

function getRowFormFields(record, columns, currentRow, index) {
    var actionCell = void 0;
    if (currentRow.firstElementChild === null) {
        var updateFormHandler = function updateFormHandler() {
            var updatedRow = getRowFormFields(config.participants.mockDataSet[index], columns, this.closest('tr'), index);
        };

        var deleteFormHandler = function deleteFormHandler() {
            config.participants.mockDataSet.splice(index, 1);
            this.closest('tr').remove();
        };

        actionCell = document.createElement('td');

        var updateButton = document.createElement('button');
        updateButton.setAttribute('type', 'button');
        updateButton.innerHTML = 'UPDATE';
        updateButton.addEventListener('click', updateFormHandler);

        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.addEventListener('click', deleteFormHandler);

        ;
        deleteButton.innerHTML = 'DELETE';
        actionCell.append(updateButton);
        actionCell.append(deleteButton);
    } else {
        actionCell = currentRow.firstElementChild;
    }
    currentRow.innerHTML = '';
    currentRow.setAttribute('data-editable', true);
    currentRow.setAttribute('data-index', index);
    currentRow.append(actionCell);
    columns.map(function (column, columnIndex) {
        getFormDisplayer(record[column.id], column, currentRow);
    });
    return currentRow;
}

function editFormPage(participantsFormContent) {
    var rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', 'row');

    var bsDiv = document.createElement('div');
    bsDiv.setAttribute('class', 'BootstrapForm');

    var childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'col-sm-10');

    var form = document.createElement('form');
    form.setAttribute('class', 'formParticipants');

    var columns = config.participantsFormView.columns;
    Object.keys(columns).map(function (c) {
        var cellDiv = document.createElement('div');
        cellDiv.setAttribute('class', 'formBlock');

        var labelSpan = document.createElement('span');
        var labelEle = document.createElement('b');
        var breakEle = document.createElement('br');
        labelEle.innerHTML = columns[c].label.toString().toUpperCase();
        labelSpan.append(labelEle);
        cellDiv.append(labelSpan);
        cellDiv.append(breakEle);

        var fieldData = config.participantsForm.mockDataSet[0][columns[c].id];
        var dataType = typeof fieldData === 'undefined' ? 'undefined' : _typeof(fieldData);
        switch (dataType) {
            case 'boolean':
                updateForm(cellDiv, '', columns[c].id, columns[c].label, fieldData, dataType, true);
                form.append(cellDiv);
                return fieldData;
            case 'object':
                var displayer = columns[c].displayer.pattern.split('\n').map(function (d) {
                    return d.slice(1, -1);
                });
                var seperator = columns[c].displayer.separator + " ";
                if (Array.isArray(fieldData)) {
                    var homeChecked = columns[c].homeChecked;
                    var obj = void 0;
                    if (homeChecked) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'home';
                        })[0];
                        if (!obj) {
                            obj = fieldData.filter(function (a) {
                                return a.context == 'work';
                            })[0];
                        }
                    } else {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'work';
                        })[0];
                        if (!obj) {
                            obj = fieldData.filter(function (a) {
                                return a.context == 'home';
                            })[0];
                        }
                    }
                    Object.keys(displayer).map(function (i) {
                        updateForm(cellDiv, displayer[i], columns[c].id, columns[c].label, obj[displayer[i]], dataType, true);
                        form.append(cellDiv);
                    });
                } else {
                    Object.keys(displayer).map(function (i) {
                        updateForm(cellDiv, displayer[i], columns[c].id, columns[c].label, fieldData[displayer[i]], dataType, true);
                        form.append(cellDiv);
                    });
                }
                return displayer;
            default:
                updateForm(cellDiv, '', columns[c].id, columns[c].label, fieldData, dataType, true);
                form.append(cellDiv);
                return fieldData;
        }
    });

    var rootUpdateBtn = document.createElement('div');
    var childUpdateBtn = document.createElement('div');
    var updateButton = document.createElement('input');
    updateButton.setAttribute('name', 'update');
    updateButton.setAttribute('id', 'updateBtn');
    updateButton.setAttribute('type', 'button');
    updateButton.setAttribute('value', 'Update');
    updateButton.addEventListener('click', updateHandler);
    childUpdateBtn.append(updateButton);
    rootUpdateBtn.append(childUpdateBtn);
    form.append(rootUpdateBtn);

    var breakEle = document.createElement('br');

    var rootCancelBtn = document.createElement('div');
    var childCancelBtn = document.createElement('div');
    var cancelButton = document.createElement('input');
    cancelButton.setAttribute('name', 'cancel');
    cancelButton.setAttribute('id', 'cancelBtn');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('value', 'Cancel');
    cancelButton.addEventListener('click', cancelHandler);
    childCancelBtn.append(cancelButton);
    rootCancelBtn.append(childCancelBtn);
    form.append(rootCancelBtn);

    childDiv.append(form);
    bsDiv.append(childDiv);
    rootDiv.append(bsDiv);
    participantsFormContent.append(rootDiv);

    function updateHandler() {
        var data = formToJSON(document.forms[0]);
        var formPostData = config.participantsForm.mockDataSet[0];
        var columns = config.participantsFormView.columns;
        for (var key in data) {
            if (key.toString().match('-')) {
                (function () {
                    var mainKey = key.toString().split('-')[0];
                    var subKey = key.toString().split('-')[1];
                    var fieldData = formPostData[mainKey];
                    Object.keys(columns).map(function (c) {
                        var column = columns[c];
                        var homeChecked = column.homeChecked;
                        var obj = void 0;
                        if (Array.isArray(fieldData)) {
                            if (homeChecked) {
                                obj = fieldData.filter(function (a) {
                                    return a.context == 'home';
                                })[0];
                                if (!obj) {
                                    obj = fieldData.filter(function (a) {
                                        return a.context == 'work';
                                    })[0];
                                }
                            } else {
                                obj = fieldData.filter(function (a) {
                                    return a.context == 'work';
                                })[0];
                                if (!obj) {
                                    obj = fieldData.filter(function (a) {
                                        return a.context == 'home';
                                    })[0];
                                }
                            }
                        } else {
                            obj = fieldData;
                        }
                        obj[subKey] = data[key];
                    });
                })();
            } else {
                formPostData[key] = data[key];
            }
        }
        cancelHandler();
    }
    var formToJSON = function formToJSON(elements) {
        return [].reduce.call(elements, function (data, element) {
            data[element.name] = element.value;
            return data;
        }, {});
    };
    function cancelHandler() {
        if (participantsFormContent) {
            participantsFormContent.innerHTML = '';
            normalFormPage(participantsFormContent);
        }
    };
}

function normalFormPage(participantsFormContent) {
    var rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', 'row');

    var bsDiv = document.createElement('div');
    bsDiv.setAttribute('class', 'BootstrapForm');

    var childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'col-sm-10');

    var form = document.createElement('form');
    form.setAttribute('class', 'formParticipants');

    var columns = config.participantsFormView.columns;
    Object.keys(columns).map(function (c) {
        var spanElement = void 0;
        var cellDiv = document.createElement('div');
        cellDiv.setAttribute('class', 'formBlock');

        var labelSpan = document.createElement('span');
        var labelEle = document.createElement('b');
        var breakEle = document.createElement('br');
        labelEle.innerHTML = columns[c].label.toString().toUpperCase();
        labelSpan.append(labelEle);
        cellDiv.append(labelSpan);
        cellDiv.append(breakEle);

        var fieldData = config.participantsForm.mockDataSet[0][columns[c].id];
        var dataType = typeof fieldData === 'undefined' ? 'undefined' : _typeof(fieldData);
        switch (dataType) {
            case 'boolean':
                spanElement = document.createElement('span');
                spanElement.innerHTML = fieldData;
                cellDiv.append(spanElement);
                form.append(cellDiv);
                return fieldData;
            case 'object':
                var displayer = columns[c].displayer.pattern.split('\n').map(function (d) {
                    return d.slice(1, -1);
                });
                var seperator = columns[c].displayer.separator + " ";
                if (Array.isArray(fieldData)) {
                    var homeChecked = columns[c].homeChecked;
                    var obj = void 0;
                    if (homeChecked) {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'home';
                        })[0];
                        if (!obj) {
                            obj = fieldData.filter(function (a) {
                                return a.context == 'work';
                            })[0];
                        }
                    } else {
                        obj = fieldData.filter(function (a) {
                            return a.context == 'work';
                        })[0];
                        if (!obj) {
                            obj = fieldData.filter(function (a) {
                                return a.context == 'home';
                            })[0];
                        }
                    }
                    Object.keys(displayer).map(function (i) {
                        spanElement = document.createElement('span');
                        spanElement.innerHTML = obj[displayer[i]];
                        cellDiv.append(spanElement);
                        breakEle = document.createElement('br');
                        cellDiv.append(breakEle);
                        form.append(cellDiv);
                    });
                } else {
                    Object.keys(displayer).map(function (i) {
                        spanElement = document.createElement('span');
                        spanElement.innerHTML = fieldData[displayer[i]];
                        cellDiv.append(spanElement);
                        breakEle = document.createElement('br');
                        cellDiv.append(breakEle);
                        form.append(cellDiv);
                    });
                }
                return displayer;
            default:
                spanElement = document.createElement('span');
                spanElement.innerHTML = fieldData;
                cellDiv.append(spanElement);
                form.append(cellDiv);
                return fieldData;
        }
    });
    var rootEditBtn = document.createElement('div');
    var childEditBtn = document.createElement('div');
    var editButton = document.createElement('input');
    editButton.setAttribute('name', 'edit');
    editButton.setAttribute('id', 'editBtn');
    editButton.setAttribute('type', 'button');
    editButton.setAttribute('value', 'Edit');
    editButton.addEventListener('click', editHandler);
    childEditBtn.append(editButton);
    rootEditBtn.append(childEditBtn);
    form.append(rootEditBtn);
    childDiv.append(form);
    bsDiv.append(childDiv);
    rootDiv.append(bsDiv);
    participantsFormContent.append(rootDiv);
    function editHandler() {
        if (participantsFormContent) {
            participantsFormContent.innerHTML = '';
            editFormPage(participantsFormContent);
        }
    };
}
