document.addEventListener('DOMContentLoaded', function() {
  // Function to handle the "Add Meal" button click event
  document.getElementById('addMeal').addEventListener('click', function(event) {
    event.preventDefault();

    var day = document.getElementById('addDay').value;
    var meal = document.getElementById('addFood').value;

    var newEntry = {
      day: day,
      food: meal
    };

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
          // Reload the meal plan after adding a new entry
          loadMealPlan();
        } else {
          console.error('Error occurred while adding a meal entry.');
        }
      })
      .catch(function(error) {
        console.error('Error occurred while adding a meal entry:', error);
      });

    document.getElementById('addDay').value = '';
    document.getElementById('addFood').value = '';
  });

  // Function to handle the "Update Meal" button click event
  document.getElementById('updateMeal').addEventListener('click', function(event) {
    event.preventDefault();

    var dayToUpdate = document.getElementById('updateDay').value;
    var newMeal = document.getElementById('updateFood').value;

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
        var entryToUpdate = data.find(function(entry) {
          return entry.day === dayToUpdate;
        });

        if (entryToUpdate) {
          var entryId = entryToUpdate.id;
          var updatedData = {
            day: dayToUpdate,
            food: newMeal
          };

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
                // Reload the meal plan after updating the entry
                loadMealPlan();
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

    document.getElementById('updateDay').value = '';
    document.getElementById('updateFood').value = '';
  });

  // Function to handle the "Delete Meal" button click event
  document.getElementById('deleteMeal').addEventListener('click', function(event) {
    event.preventDefault();

    var day = document.getElementById('deleteDay').value;
    var meal = document.getElementById('deleteFood').value;

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
        var entryToDelete = data.find(function(entry) {
          return entry.day === day && entry.food === meal;
        });

        if (entryToDelete) {
          var entryId = entryToDelete.id;

          fetch('http://localhost:3000/mealPlan/' + entryId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function(response) {
              if (response.ok) {
                console.log('Meal entry deleted successfully!');
                // Reload the meal plan after deleting the entry
                loadMealPlan();
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

    document.getElementById('deleteDay').value = '';
    document.getElementById('deleteFood').value = '';
  });

  // Function to load and display the meal plan
  function loadMealPlan() {
    var mealPlanTextarea = document.getElementById('showMealPlan');

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
        var mealEntries = data.map(function(entry) {
          return entry.day + ': ' + entry.food;
        });

        if (mealEntries.length > 0) {
          var mealPlan = mealEntries.join('\n');
          mealPlanTextarea.value = mealPlan;
        } else {
          mealPlanTextarea.value = 'No meal entries found.';
        }
      })
      .catch(function(error) {
        console.error('Error occurred while fetching the meal plan:', error);
      });
  }

  // Initial loading of the meal plan
  loadMealPlan();
});

