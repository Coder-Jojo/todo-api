# Todo Application

**Todo Table**

| Column   | Type    |
| -------- | ------- |
| id       | INTEGER |
| todo     | TEXT    |
| category | TEXT    |
| priority | TEXT    |
| status   | TEXT    |
| due_date | DATE    |


### API 1

#### Path: `/todos/`

#### Method: `GET`

- **Scenario 1**

  - **Sample API**
    ```
    /todos/?status=TO%20DO
    ```
  - **Description**:

    Returns a list of all todos whose status is 'TO DO'


- **Scenario 2**

  - **Sample API**
    ```
    /todos/?priority=HIGH
    ```
  - **Description**:

    Returns a list of all todos whose priority is 'HIGH'

  
- **Scenario 3**

  - **Sample API**
    ```
    /todos/?priority=HIGH&status=IN%20PROGRESS
    ```
  - **Description**:

    Returns a list of all todos whose priority is 'HIGH' and status is 'IN PROGRESS'

  
- **Scenario 4**

  - **Sample API**
    ```
    /todos/?search_q=Buy
    ```
  - **Description**:

    Returns a list of all todos whose todo contains 'Buy' text

  
- **Scenario 5**

  - **Sample API**
    ```
    /todos/?category=WORK&status=DONE
    ```
  - **Description**:

    Returns a list of all todos whose category is 'WORK' and status is 'DONE'

  
- **Scenario 6**

  - **Sample API**
    ```
    /todos/?category=HOME
    ```
  - **Description**:

    Returns a list of all todos whose category is 'HOME'

  
- **Scenario 7**

  - **Sample API**
    ```
    /todos/?category=LEARNING&priority=HIGH
    ```
  - **Description**:

    Returns a list of all todos whose category is 'LEARNING' and priority is 'HIGH'

### API 2

#### Path: `/todos/:todoId/`

#### Method: `GET`

#### Description:

Returns a specific todo based on the todo ID


### API 3

#### Path: `/agenda/`

#### Method: `GET`

#### Description:

Returns a list of all todos with a specific due date in the query parameter `/agenda/?date=2021-02-22`


### API 4

#### Path: `/todos/`

#### Method: `POST`

#### Description:

Create a todo in the todo table,


### API 5

#### Path: `/todos/:todoId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific todo based on the todo ID


### API 6

#### Path: `/todos/:todoId/`

#### Method: `DELETE`

#### Description:

Deletes a todo from the todo table based on the todo ID


<br/>

