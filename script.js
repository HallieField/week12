document.addEventListener('DOMContentLoaded', function() {
  // When the page content is loaded and ready

  // add meal function
  document.getElementById('addMeal').addEventListener('click', function(event) {
    event.preventDefault();

    // here we get the values entered by the user for day and meal
    var day = document.getElementById('addDay').value;
    var meal = document.getElementById('addFood').value;

    // this creates a new entry object with the day and meal values
    var newEntry = {
      day: day,
      food: meal
    };

    // sends a POST request to the server to add the new meal entry. 
    // stringify converts js object to json string before sending it to the server.
    fetch('http://localhost:3000/mealPlan', {
      method: 'POST',
      body: JSON.stringify(newEntry),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (response.ok) {
          console.log('Meal entry added successfully!');
        } else {
          console.error('Error occurred while adding a meal entry.');
        }
      })
      .catch(function(error) {
        console.error('Error occurred while adding a meal entry:', error);
      });

    // clears the input fields after adding the meal entry
    document.getElementById('addDay').value = '';
    document.getElementById('addFood').value = '';
  });

  // update meal function
  document.getElementById('updateMeal').addEventListener('click', function(event) {
    event.preventDefault();

    // here we get the values entered by the user for the day to update and the new meal
    var dayToUpdate = document.getElementById('updateDay').value;
    var newMeal = document.getElementById('updateFood').value;

    // sends a GET request to the server to fetch the meal plan data
    fetch('http://localhost:3000/mealPlan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error occurred while fetching the meal plan.');
        }
      })
      .then(function(data) {
        // locates the entry to update based on the day entered by the user
        var entryToUpdate = data.find(function(entry) {
          return entry.day === dayToUpdate;
        });

        if (entryToUpdate) {
          var entryId = entryToUpdate.id;
          var updatedData = {
            day: dayToUpdate,
            food: newMeal
          };

          // send a PUT request to the server to update the meal entry
          fetch('http://localhost:3000/mealPlan/' + entryId, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function(response) {
              if (response.ok) {
                console.log('Meal entry updated successfully!');
              } else {
                console.error('Error occurred while updating the meal entry.');
              }
            })
            .catch(function(error) {
              console.error('Error occurred while updating the meal entry:', error);
            });
        } else {
          console.log('Meal entry not found!');
        }
      })
      .catch(function(error) {
        console.error('Error occurred while fetching the meal plan:', error);
      });

    // clear the input fields after updating the meal entry
    document.getElementById('updateDay').value = '';
    document.getElementById('updateFood').value = '';
  });

  // delete meal function
  document.getElementById('deleteMeal').addEventListener('click', function(event) {
    event.preventDefault();

    // here we get the values entered by the user for the day and meal to delete
    var day = document.getElementById('deleteDay').value;
    var meal = document.getElementById('deleteFood').value;

    // send a GET request to the server to fetch the meal plan data
    fetch('http://localhost:3000/mealPlan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error occurred while fetching the meal plan.');
        }
      })
      .then(function(data) {
        // locates the entry to delete based on the day and meal entered by the user
        var entryToDelete = data.find(function(entry) {
          return entry.day === day && entry.food === meal;
        });

        if (entryToDelete) {
          var entryId = entryToDelete.id;

          // Send a DELETE request to the server to delete the meal entry
          fetch('http://localhost:3000/mealPlan/' + entryId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function(response) {
              if (response.ok) {
                console.log('Meal entry deleted successfully!');
              } else {
                console.error('Error occurred while deleting the meal entry.');
              }
            })
            .catch(function(error) {
              console.error('Error occurred while deleting the meal entry:', error);
            });
        } else {
          console.log('Meal entry not found!');
        }
      })
      .catch(function(error) {
        console.error('Error occurred while fetching the meal plan:', error);
      });

    // clear the input fields after deleting the meal entry
    document.getElementById('deleteDay').value = '';
    document.getElementById('deleteFood').value = '';
  });

  // display meal plan function
  document.getElementById('showMeal').addEventListener('click', function(event) {
    event.preventDefault();

    var mealPlanTextarea = document.getElementById('showMealPlan');

    // send a GET request to the server to fetch the meal plan data
    fetch('http://localhost:3000/mealPlan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error occurred while fetching the meal plan.');
        }
      })
      .then(function(data) {
        // here we create an array of strings representing the day and meal entries
        var mealEntries = data.map(function(entry) {
          return entry.day + ': ' + entry.food;
        });

        if (mealEntries.length > 0) {
          // this joins the meal entries with a line break and then sets it as the value of the textarea
          var mealPlan = mealEntries.join('\n');
          mealPlanTextarea.value = mealPlan;
        } else {
          mealPlanTextarea.value = 'No meal entries found.';
        }
      })
      .catch(function(error) {
        console.error('Error occurred while fetching the meal plan:', error);
      });
  });
});


