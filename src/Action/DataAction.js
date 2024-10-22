import axios from "axios";

// Define action types as constants
const DATA_REQUEST = "DATA_REQUEST";
const DATA_SUCCESS = "DATA_SUCCESS";
const DATA_FAILURE = "DATA_FAILURE";
const SELECT_DATA_REQUEST = "SELECT_DATA_REQUEST";
const SELECT_DATA_SUCCESS = "SELECT_DATA_SUCCESS";
const SELECT_DATA_FAILURE = "SELECT_DATA_FAILURE";

// Fetch all data from the API
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    dispatch({ type: DATA_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({ type: DATA_FAILURE, payload: error.message });
  }
};

// Select data based on group and order
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_DATA_REQUEST });

    let user = false;
    let mySet = new Set();
    let arr = [];
    let selectedData = [];

    // Group data by status, user, or priority
    if (group === "status") {
      allTickets.forEach((element) => mySet.add(element.status));
      arr = [...mySet];

      arr.forEach((element, index) => {
        const filteredArr = allTickets.filter(
          (fElement) => fElement.status === element
        );
        selectedData.push({
          [index]: { title: element, value: filteredArr },
        });
      });
    } else if (group === "user") {
      user = true;

      const allUser = allTickets.allUser || [];
      const allTicketItems = allTickets.allTickets || [];

      allUser.forEach((element, index) => {
        const userTickets = allTicketItems.filter(
          (Felement) => Felement.userId === element.id
        );
        selectedData.push({
          [index]: { title: element.name, value: userTickets },
        });
      });
    } else {
      const prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];

      prior_list.forEach((element, index) => {
        const priorityArr = allTickets.filter(
          (fElement) => fElement.priority === index
        );
        selectedData.push({
          [index]: { title: element, value: priorityArr },
        });
      });
    }

    // Sort the selected data based on title or priority
    if (orderValue === "title") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (orderValue === "priority") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    // Save selected data to localStorage for persistence
    localStorage.setItem('selectedData', JSON.stringify({ selectedData, user }));

    dispatch({ type: SELECT_DATA_SUCCESS, payload: { selectedData, user } });
  } catch (error) {
    console.error("Error selecting data:", error);
    dispatch({
      type: SELECT_DATA_FAILURE,
      payload: error.message || "Failed to select data",
    });
  }
};

// Load saved view state from localStorage
export const loadSavedState = () => {
  return (dispatch) => {
    const savedState = localStorage.getItem('selectedData');
    if (savedState) {
      dispatch({ type: SELECT_DATA_SUCCESS, payload: JSON.parse(savedState) });
    }
  };
};
