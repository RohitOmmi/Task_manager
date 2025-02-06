function doPost(e) {
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1SXyDBvk3gvVllkhkEQG_8xxpLCzhMpsMyTl0UkyCJMU/edit")
                .getSheetByName("Form");

  let data = e.parameter;
  
  if (data.update === "true") {
    let taskName = data.Task;
    let newStatus = data.status;
    let newComment = data.Comments || ""; 
    
    let rows = sheet.getDataRange().getValues();
    
    for (let i = 1; i < rows.length; i++) { 
      if (rows[i][1] === taskName) { // Task column matches
        sheet.getRange(i + 1, 6).setValue(newStatus); // Update Status (column 6)
        
        if (newComment) {
          sheet.getRange(i + 1, 3).setValue(newComment); // Update Comments (column 3)
        }

        // If status is "Completed", store completion date & time
        if (newStatus === "Completed") {
          let currentDateTime = new Date();
          let completionDate = currentDateTime.toISOString().split("T")[0]; 
          let completionTime = currentDateTime.toLocaleTimeString();

          sheet.getRange(i + 1, 9).setValue(completionDate); // Column 9: Completion Date
          sheet.getRange(i + 1, 10).setValue(completionTime); // Column 10: Completion Time
        }
        
        return ContentService.createTextOutput("Task Updated Successfully");
      }
    }
    
    return ContentService.createTextOutput("Task Not Found");
  } 
  else if (data.reassign === "true") {
    // Task reassignment logic
    let taskId = parseInt(data.taskId, 10);
    let newAssignee = data.TaskAssignedto;

    if (!taskId || !newAssignee) {
      return ContentService.createTextOutput("Invalid task reassignment data");
    }

    let rows = sheet.getDataRange().getValues();
    
    for (let i = 1; i < rows.length; i++) { 
      if (i === taskId) {
        sheet.getRange(i + 1, 4).setValue(newAssignee); // Column 4: TaskAssignedto
        sheet.getRange(i + 1, 6).setValue("Yet to Start"); // Reset status to "Yet to Start"
        return ContentService.createTextOutput("Task Reassigned Successfully");
      }
    }

    return ContentService.createTextOutput("Task ID Not Found");
  } 
  else {
    let currentDateTime = new Date();
    let taskDate = data.Date ? data.Date : currentDateTime.toISOString().split("T")[0];
    let taskTime = currentDateTime.toLocaleTimeString();
    let status = data.status || "Yet to Start";

    sheet.appendRow([
      data.RequestRaisedBy, 
      data.Task, 
      data.Comments || "", 
      data.TaskAssignedto, 
      data.priority, 
      status,     
      taskDate,   
      taskTime,   
      "",         
      ""          
    ]);

    return ContentService.createTextOutput("Task Added Successfully");
  }
}


function doGet() {
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1SXyDBvk3gvVllkhkEQG_8xxpLCzhMpsMyTl0UkyCJMU/edit")
                .getSheetByName("Form");

  const rows = sheet.getDataRange().getValues();
  const headers = rows[0]; // First row contains headers
  let data = [];

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][5] !== "Completed") { // Hide Completed tasks in UI
      let rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rows[i][j];
      }
      data.push(rowObject);
    }
  }

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}



