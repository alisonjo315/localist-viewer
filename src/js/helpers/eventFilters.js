/**
 * Renders the filter elemet usually used in the wrapper.
 *
 * @todo Add wai-aria controls support
 *
 * @param {array} filterObjs A array of objects [{id:'',name:'',filterby:''}]
 * @param {string} domTarget A string of html id #id should exist and be unique.
 * @return {string} A html string.
 */
const eventFilters = (filterObjs, domTarget) => {
    if (typeof filterObjs === 'undefined' || typeof domTarget === 'undefined') {
        console.error('invalid props in eventFilters()');
        return '';
    }
    // make sure function names are safe strings
    const domStr = domTarget.replace(/[^\w]/gi, '');
    return /* html */ `
        <div class="events-filters-wrap">
            <h3 class="hidden">Show:</h3>
            <ul class="events-filters">
                <li>
                    <button
                        id="filterAll-${domStr}"
                        data-filter="all"
                        class="filter-btn active"
                    >
                        All Events
                    </button>
                </li>
                ${
                    filterObjs
                        ? Object.keys(filterObjs)
                              .map(
                                  key =>
                                      `<li><button id='filter${
                                          filterObjs[key].id
                                      }-${domStr}' data-filter="${
                                          filterObjs[key].filterby
                                      }-${
                                          filterObjs[key].id
                                      }" class="filter-btn" >${
                                          filterObjs[key].name
                                      }</button></li>`
                              )
                              .join('')
                        : ''
                }
            </ul>
        </div>
    `;
};

/**
 * @todo Try not to use that return the filter.
 * @param {obj} event The localist event object.
 * @param {obj} that The component.
 */
const buildEventWrapperFilters = (event, that) => {
    if (
        that.props.filterby === 'type' &&
        that.builtEvent.type !== 0 &&
        event.filters.event_types
    ) {
        that.wrapperArgs.filters[event.filters.event_types[0].name] = {
            id: event.filters.event_types[0].id,
            name: event.filters.event_types[0].name,
            filterby: that.props.filterby
        };
    } else if (
        that.props.filterby === 'dept' &&
        that.builtEvent.department !== 0 &&
        event.filters.departments
    ) {
        that.wrapperArgs.filters[event.filters.departments[0].name] = {
            id: event.filters.departments[0].id,
            name: event.filters.departments[0].name,
            filterby: that.props.filterby
        };
    } else if (
        that.props.filterby === 'group' &&
        that.builtEvent.group_name !== ''
    ) {
        that.wrapperArgs.filters[that.builtEvent.group_name] = {
            id: that.builtEvent.group_id,
            name: that.builtEvent.group_name,
            filterby: that.props.filterby
        };
    }
};

export { eventFilters, buildEventWrapperFilters };
