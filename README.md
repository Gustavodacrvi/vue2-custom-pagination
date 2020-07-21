# vue2-custom-pagination

Completely customizable custom pagination component for vue.js version 2.

## TABLE OF CONTENTS
* [Example](#example)
* [Component Props](#component-props)
* [Default Template Slot Props](#Default-Template-Slot-Props)
* [Divisor Template Slot Props](#Divisor-Template-Slot-Props)
* [Notes](#notes)


## Example:

To use this component, you must provide a _template_ for the pagination elements and a _v-model_ for controlling the active page. You must provide both
*listLength* and *pageSize* or *only* *numberOfTabs* props.

In this example, we're using a *scope* of 5, which means the distance between the center *active* element and the corners of the container will be inclusively 5 elements.
We're also using the *isActive* to show the active blue element, the *isMin* and *isMax* to add a border-radius to all sides on the element "1" and the element "970", and *isFirst* and *isLast*
for adding a curved border only on the "30"/"38" corners.

![Pagination Example](/screenshots/example.png)

```
<Pagination
  v-model="currentPage"
  :listLength="items.length"
  :pageSize="25"
  :scope='5'
>
  <template v-slot='{number, classObj}'> // classObj: isMin, isMax, isFirst, isLast, isActive
    <span
      class="el"
      :class="classObj"
      @click="currentPage = number"
    >
      {{ number }}
    </span>
  </template>
  <template v-slot:divisor={isFirst, isLast}>
    <span style="dots">
      ...
    </span>
  </template>
</Pagination>
```

```

.el {
  padding: 6px;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  min-width: 30px;
  background-color: white;
  transition-duration: .125s;
  cursor: pointer;
}

.el:hover, .isActive { 
  color: white;
  background-color: #1E4369;
}

.isLast, .isMin, .isMax {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.isFirst, .isMin, .isMax {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.dots {
  font-size: 18px;
  margin: 0 12px;
}


```

## Component Props

| Prop      | Type | Default | Description |
| -------------|:-------------:|:-------------:|:-------------|
| value | Number | 1 | Used on v-model. |
| numberOfTabs | Number | undefined | Sometimes you know *exactly* how many tabs you need, on these cases you *should* use this prop. |
| scope | Number | 4 | It's the *inclusive* distance between the active element and the corners. |
| listLength | Number | undefined | When you don't know *exactly* the number of tabs you need, you should use this prop in conjunction with the *pageSize* prop. The component will automatically calculate the number of tabs. |
| pageSize | Number | undefined | The number of items in each page, *should* be used with listLength. |


## Default Template Slot Props

The template receives *slot props* which can be used on your template. It has the *number* containing the page index and *classObj* which has a series *booleans* for class binding.

| Property      | Description          |
| ------------- |:-------------|
| isActive      | Styles the active page element. |
| isMax         | Styles the *last item* after the divisor. |
| isMin         | Styles *only the first item* right before the divisor. |
| isLast        | Styles the *last item between the divisors*. |
| isFirst       | Styles the *first item between the divisors*.  |


## Divisor Template Slot Props

You can also add a custom *divisor* template, it's the component that will be rendered between the last element and the first element when necessary. It receives *{isFirst: boolean, isLast: boolean}* slot props.


| Property | Description | 
| ------------- |:-------------|
| isFirst | Styles the first divisor after the first page element. | 
| isLast | Styles the last divisor after the last page element. |


## Notes

The component uses "display: flex;justify-content: center" to centralize its elements, if you want to change the alignment, simply override these styles.

```
<Pagination class="pagination"
  ...
  ...
  ...
```

```

.pagination {
  justify-content: flex-start !important;
}

```
