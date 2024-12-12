'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var isValid = require('date-fns/isValid');
var formatStringByPattern = require('format-string-by-pattern');
var React = require('react');
var isEqual = require('react-fast-compare');
var convertTokens = require('@date-fns/upgrade/v2/convertTokens');
var format = require('date-fns/format');
var isBefore = require('date-fns/isBefore');
var parse = require('date-fns/parse');
var startOfDay = require('date-fns/startOfDay');
var Dayzed = require('dayzed');
var compareAsc = require('date-fns/compareAsc');
var isSameDay = require('date-fns/isSameDay');
var cn = require('classnames');
var semanticUiReact = require('semantic-ui-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isValid__default = /*#__PURE__*/_interopDefaultLegacy(isValid);
var formatStringByPattern__default = /*#__PURE__*/_interopDefaultLegacy(formatStringByPattern);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var format__default = /*#__PURE__*/_interopDefaultLegacy(format);
var isBefore__default = /*#__PURE__*/_interopDefaultLegacy(isBefore);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);
var startOfDay__default = /*#__PURE__*/_interopDefaultLegacy(startOfDay);
var Dayzed__default = /*#__PURE__*/_interopDefaultLegacy(Dayzed);
var compareAsc__default = /*#__PURE__*/_interopDefaultLegacy(compareAsc);
var isSameDay__default = /*#__PURE__*/_interopDefaultLegacy(isSameDay);
var cn__default = /*#__PURE__*/_interopDefaultLegacy(cn);

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

const keys = {
  enter: 13,
  escape: 27,
  space: 32
};
const isSelectable = (date, minDate, maxDate) => {
  if (minDate && isBefore__default["default"](date, minDate) || maxDate && isBefore__default["default"](maxDate, date)) {
    return false;
  }
  return true;
};
const getToday = (minDate, maxDate) => {
  const today = new Date();
  return {
    date: startOfDay__default["default"](today),
    nextMonth: false,
    prevMonth: false,
    selectable: isSelectable(today, minDate, maxDate),
    selected: false,
    today: true
  };
};
const formatDate = (date, dateFormat, formatOptions) => date ? format__default["default"](startOfDay__default["default"](date), convertTokens.convertTokens(dateFormat), formatOptions) : undefined;
const omit = (keysToOmit, obj) => {
  const newObj = _extends({}, obj);
  keysToOmit.forEach(key => delete newObj[key]);
  return newObj;
};
const pick = (keysToPick, obj) => {
  const newObj = {};
  keysToPick.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
};
const moveElementsByN = (n, arr) => arr.slice(n).concat(arr.slice(0, n));
const formatSelectedDate = (selectedDate, dateFormat, formatOptions) => {
  if (!selectedDate) {
    return '';
  }
  return Array.isArray(selectedDate) ? selectedDate.map(date => formatDate(date, dateFormat, formatOptions)).join(' - ') : formatDate(selectedDate, dateFormat, formatOptions);
};
const parseFormatString = formatString => formatString.replace(/[D, Y]/gi, a => a.toLowerCase());
const parseOnBlur = (typedValue, formatString) => {
  return parse__default["default"](typedValue, parseFormatString(formatString), new Date());
};
const parseRangeOnBlur = (typedValue, formatString) => {
  const parsedFormatString = parseFormatString(formatString);
  const rangeValues = typedValue.split(' - ');
  return rangeValues.map(value => parse__default["default"](value, parsedFormatString, new Date())).sort((a, b) => a > b ? 1 : -1);
};
const onlyNumbers = function (value) {
  if (value === void 0) {
    value = '';
  }
  return value.replace(/[^\d]/g, '');
};
function getShortDate(date) {
  if (!date) {
    return undefined;
  }
  return format__default["default"](date, 'yyyy-MM-dd');
}

/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls
 * `event.preventDefault()`. Not sure this is the best
 * way to do this, but it seems legit...
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(fn => {
      if (fn) {
        fn(event, ...args);
      }
      return event.defaultPrevented;
    });
  };
}
/**
 * Create an event handler for keyboard key given a config map
 * of event handlers
 * @param {Object} config consists of left, right, up, and down
 * @return {Function} the event handler to handle keyboard key
 */
function getArrowKeyHandlers(config) {
  return event => {
    const {
      keyCode
    } = event;
    const fn = {
      37: config.left,
      39: config.right,
      38: config.up,
      40: config.down
    }[keyCode];
    if (fn) {
      fn(event);
    }
  };
}
/**
 * Checks if a given date is with date range
 * @param {Array} range the range array with upper and lower bound
 * @param {Date} date a given date
 * @return {Boolean} true if date is in the range, false otherwise
 */
function isInRange(range, date) {
  return range.length === 2 && range[0] <= date && range[1] >= date;
}

const _excluded$6 = ["refKey"],
  _excluded2$1 = ["children"];
class BaseDatePicker extends React__default["default"].Component {
  constructor() {
    var _this;
    super(...arguments);
    _this = this;
    this.state = {
      offset: 0
    };
    this.rootNode = React__default["default"].createRef();
    this.handleArrowKeys = getArrowKeyHandlers({
      left: () => this.getKeyOffset(-1),
      right: () => this.getKeyOffset(1),
      up: () => this.getKeyOffset(-7),
      down: () => this.getKeyOffset(7)
    });
    this.getRootProps = function (_temp) {
      let _ref = _temp === void 0 ? {} : _temp,
        {
          refKey = 'ref'
        } = _ref,
        rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);
      return _extends({
        [refKey]: _this.rootNode,
        onKeyDown: _this.handleArrowKeys
      }, rest);
    };
    this._handleOffsetChanged = offset => {
      this.setState({
        offset
      });
    };
  }
  getKeyOffset(number) {
    if (!this.rootNode.current) {
      return;
    }
    const activeEl = document.activeElement;
    const buttons = Array.from(this.rootNode.current.querySelectorAll('button:not(:disabled)'));
    buttons.some((btn, i) => {
      const newNodeKey = i + number;
      if (btn !== activeEl) {
        return false;
      }
      if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
        buttons[newNodeKey].focus();
        return true;
      }
      buttons[0].focus();
      return true;
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this._handleOffsetChanged(0);
    }
  }
  render() {
    const _this$props = this.props,
      {
        children
      } = _this$props,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded2$1);
    return jsxRuntime.jsx(Dayzed__default["default"], _extends({}, rest, {
      offset: this.state.offset,
      onOffsetChanged: this._handleOffsetChanged,
      render: renderProps => children(_extends({}, renderProps, {
        getRootProps: this.getRootProps
      }))
    }));
  }
}

class DatePicker extends React__default["default"].Component {
  constructor() {
    super(...arguments);
    this._handleOnDateSelected = (_ref, event) => {
      let {
        selectable,
        date
      } = _ref;
      const {
        clearOnSameDateClick,
        selected: selectedDate,
        onChange
      } = this.props;
      if (!selectable) {
        return;
      }
      let newDate = date;
      if (selectedDate && selectedDate.getTime() === date.getTime() && clearOnSameDateClick) {
        newDate = null;
      }
      if (onChange) {
        onChange(event, newDate);
      }
    };
  }
  render() {
    return jsxRuntime.jsx(BaseDatePicker, _extends({}, this.props, {
      onDateSelected: this._handleOnDateSelected
    }));
  }
}

const _excluded$5 = ["onMouseEnter", "onFocus"],
  _excluded2 = ["children"],
  _excluded3 = ["getRootProps", "getDateProps"];
class RangeDatePicker extends React__default["default"].Component {
  constructor() {
    super(...arguments);
    this.state = {
      hoveredDate: null
    };
    this.setHoveredDate = date => {
      this.setState(state => state.hoveredDate === date ? null : {
        hoveredDate: date
      });
    };
    this.onMouseLeave = () => {
      this.setHoveredDate(null);
    };
    this._handleOnDateSelected = (_ref, event) => {
      let {
        selectable,
        date
      } = _ref;
      const {
        selected: selectedDates,
        onChange
      } = this.props;
      if (!selectable) {
        return;
      }
      const dateTime = date.getTime();
      let newDates = [...selectedDates];
      if (selectedDates.length) {
        if (selectedDates.length === 1) {
          const firstTime = selectedDates[0].getTime();
          if (firstTime < dateTime) {
            newDates.push(date);
          } else {
            newDates.unshift(date);
          }
        } else if (newDates.length === 2) {
          newDates = [date];
        }
      } else {
        newDates.push(date);
      }
      if (onChange) {
        onChange(event, newDates);
      }
      if (newDates.length === 2) {
        this.setHoveredDate(null);
      }
    };
    this.getEnhancedDateProps = (getDateProps, dateBounds, _ref2) => {
      let {
          onMouseEnter,
          onFocus
        } = _ref2,
        restProps = _objectWithoutPropertiesLoose(_ref2, _excluded$5);
      const {
        hoveredDate
      } = this.state;
      const {
        date
      } = restProps.dateObj;
      return getDateProps(_extends({}, restProps, {
        inRange: isInRange(dateBounds, date),
        start: dateBounds[0] && isSameDay__default["default"](dateBounds[0], date),
        end: dateBounds[1] && isSameDay__default["default"](dateBounds[1], date),
        // @ts-ignore
        hovered: hoveredDate && isSameDay__default["default"](hoveredDate, date),
        onMouseEnter: composeEventHandlers(onMouseEnter, () => {
          this.onHoverFocusDate(date);
        }),
        onFocus: composeEventHandlers(onFocus, () => {
          this.onHoverFocusDate(date);
        })
      }));
    };
    this.getEnhancedRootProps = (getRootProps, props) => getRootProps(_extends({}, props, {
      onMouseLeave: this.onMouseLeave
    }));
  } // Calendar level
  // Date level
  onHoverFocusDate(date) {
    if (this.props.selected.length !== 1) {
      return;
    }
    this.setHoveredDate(date);
  }
  render() {
    const _this$props = this.props,
      {
        children
      } = _this$props,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    const {
      hoveredDate
    } = this.state;
    const {
      selected
    } = this.props;
    const dateBounds = selected.length === 2 || !selected.length || !hoveredDate ? selected :
    // prettier-ignore
    // @ts-ignore
    [selected[0], hoveredDate].sort(compareAsc__default["default"]);
    return jsxRuntime.jsx(BaseDatePicker, _extends({}, rest, {
      onDateSelected: this._handleOnDateSelected,
      children: _ref3 => {
        let {
            getRootProps,
            getDateProps
          } = _ref3,
          renderProps = _objectWithoutPropertiesLoose(_ref3, _excluded3);
        return children(_extends({}, renderProps, {
          getRootProps: this.getEnhancedRootProps.bind(this, getRootProps),
          getDateProps: this.getEnhancedDateProps.bind(this, getDateProps, dateBounds)
        }));
      }
    }));
  }
}
RangeDatePicker.defaultProps = {
  selected: []
};

const _excluded$4 = ["icon"];
const CustomButton = _ref => {
  let {
      icon
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return jsxRuntime.jsx(semanticUiReact.Button, _extends({
    basic: true,
    compact: true,
    icon: icon,
    type: "button"
  }, otherProps));
};

const _excluded$3 = ["children", "end", "hovered", "inRange", "inverted", "nextMonth", "prevMonth", "selectable", "selected", "start", "today"];
const CalendarCell = _ref => {
  let {
      children,
      inRange,
      inverted,
      nextMonth,
      prevMonth,
      selectable,
      selected,
      today
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  const className = cn__default["default"]('clndr-cell', {
    inverted,
    'clndr-cell-today': today,
    'clndr-cell-disabled': !selectable,
    'clndr-cell-other-month': nextMonth || prevMonth,
    'clndr-cell-inrange': inRange,
    'clndr-cell-selected': selected
  });
  if (!children) {
    return jsxRuntime.jsx("span", _extends({
      className: className,
      tabIndex: children ? 0 : -1
    }, otherProps, {
      children: children
    }));
  }
  return jsxRuntime.jsx("button", _extends({
    className: className,
    disabled: !selectable,
    type: "button"
  }, otherProps, {
    children: children
  }));
};
CalendarCell.defaultProps = {
  end: false,
  hovered: false,
  inRange: false,
  nextMonth: false,
  prevMonth: false,
  start: false
};

const _excluded$2 = ["aria-label", "children", "end", "hovered", "inRange", "nextMonth", "prevMonth", "selectable", "selected", "start", "today"];
const style$1 = {
  marginTop: 10
};
const TodayButton = _ref => {
  let {
      'aria-label': ariaLabel,
      children
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return jsxRuntime.jsx(semanticUiReact.Button, _extends({
    "aria-label": ariaLabel + ", " + children,
    className: "clndr-button-today",
    compact: true,
    "data-testid": "datepicker-today-button",
    fluid: true,
    style: style$1,
    type: "button"
  }, otherProps, {
    children: children
  }));
};

const _excluded$1 = ["ref"];
const styles = {
  leftBtn: {
    textAlign: 'start'
  },
  rightBtn: {
    textAlign: 'end'
  }
};
const pointings = {
  'top left': 'clndr-top clndr-left',
  'top right': 'clndr-top clndr-right',
  left: 'clndr-left',
  right: 'clndr-right'
};
const Calendar = _ref => {
  let {
    calendars,
    filterDate,
    getBackProps,
    getDateProps,
    getForwardProps,
    getRootProps,
    inline,
    inverted,
    maxDate,
    minDate,
    months,
    nextMonth,
    nextYear,
    previousMonth,
    previousYear,
    showToday,
    todayButton,
    weekdays,
    pointing
  } = _ref;
  const _getRootProps = getRootProps(),
    {
      ref: rootRef
    } = _getRootProps,
    rootProps = _objectWithoutPropertiesLoose(_getRootProps, _excluded$1);
  const pressedBtnRef = React.useRef();
  const onPressBtn = evt => {
    pressedBtnRef.current = evt.target.getAttribute('aria-label');
  };
  React.useEffect(() => {
    if (pressedBtnRef.current) {
      const selector = "[aria-label=\"" + pressedBtnRef.current + "\"]";
      const prevBtn = document.querySelector(selector);
      if (prevBtn && document.activeElement !== prevBtn) {
        prevBtn.focus();
      }
    }
  });
  return jsxRuntime.jsx(React__default["default"].Fragment, {
    children: jsxRuntime.jsxs(semanticUiReact.Segment, _extends({
      ref: rootRef
    }, rootProps, {
      inverted: inverted,
      className: cn__default["default"]('clndr-calendars-segment', {
        'clndr-floating': !inline,
        [pointings[pointing]]: !inline
      }),
      children: [jsxRuntime.jsx("div", {
        className: "clndr-calendars-wrapper",
        style: {
          '--n': calendars.length
        },
        children: calendars.map((calendar, calendarIdx) => jsxRuntime.jsxs("div", {
          children: [jsxRuntime.jsxs("div", {
            className: "clndr-control",
            children: [jsxRuntime.jsx("div", {
              style: styles.leftBtn,
              children: calendarIdx === 0 && jsxRuntime.jsxs(React.Fragment, {
                children: [jsxRuntime.jsx(CustomButton, _extends({
                  icon: "angle double left",
                  inverted: inverted,
                  title: previousYear,
                  type: "button"
                }, getBackProps({
                  calendars,
                  'aria-label': previousYear,
                  offset: 12,
                  onClick: onPressBtn
                }))), jsxRuntime.jsx(CustomButton, _extends({
                  icon: "angle left",
                  inverted: inverted,
                  style: {
                    marginRight: 0
                  },
                  title: previousMonth,
                  type: "button"
                }, getBackProps({
                  calendars,
                  'aria-label': previousMonth,
                  onClick: onPressBtn
                })))]
              })
            }), jsxRuntime.jsxs("span", {
              title: months[calendar.month] + " " + calendar.year,
              children: [months[calendar.month].slice(0, 3), " ", calendar.year]
            }), jsxRuntime.jsx("div", {
              style: styles.rightBtn,
              children: calendarIdx === calendars.length - 1 && jsxRuntime.jsxs(React.Fragment, {
                children: [jsxRuntime.jsx(CustomButton, _extends({
                  icon: "angle right",
                  inverted: inverted,
                  title: nextMonth,
                  type: "button"
                }, getForwardProps({
                  calendars,
                  'aria-label': nextMonth,
                  onClick: onPressBtn
                }))), jsxRuntime.jsx(CustomButton, _extends({
                  icon: "angle double right",
                  inverted: inverted,
                  style: {
                    marginRight: 0
                  },
                  title: nextYear,
                  type: "button"
                }, getForwardProps({
                  calendars,
                  'aria-label': nextYear,
                  offset: 12,
                  onClick: onPressBtn
                })))]
              })
            })]
          }), jsxRuntime.jsxs("div", {
            className: "clndr-days",
            children: [weekdays.map(weekday => jsxRuntime.jsx(CalendarCell, {
              inverted: inverted,
              "aria-label": weekday,
              title: weekday,
              children: weekday.slice(0, 2)
            }, calendar.year + "-" + calendar.month + "-" + weekday)), calendar.weeks.map(week => week.map((dateObj, weekIdx) => {
              const key = calendar.year + "-" + calendar.month + "-" + weekIdx;
              if (!dateObj) {
                return jsxRuntime.jsx(CalendarCell, {
                  inverted: inverted
                }, key);
              }
              const selectable = dateObj.selectable && filterDate(dateObj.date);
              const shortDate = getShortDate(dateObj.date);
              return jsxRuntime.jsx(CalendarCell, _extends({}, dateObj, getDateProps({
                dateObj: _extends({}, dateObj, {
                  selectable
                }),
                onClick: onPressBtn
              }), {
                "data-testid": "datepicker-cell-" + shortDate,
                inverted: inverted,
                selectable: selectable,
                children: dateObj.date.getDate()
              }), key);
            }))]
          })]
        }, calendar.year + "-" + calendar.month))
      }), showToday ? jsxRuntime.jsx(TodayButton, _extends({
        inverted: inverted
      }, getToday(minDate, maxDate), getDateProps({
        dateObj: getToday(minDate, maxDate),
        onClick: onPressBtn
      }), {
        children: todayButton
      })) : null]
    }))
  });
};

const CustomIcon = _ref => {
  let {
    clearIcon,
    icon,
    isClearIconVisible,
    onClear,
    onClick
  } = _ref;
  if (isClearIconVisible && clearIcon && React__default["default"].isValidElement(clearIcon)) {
    return React__default["default"].cloneElement(clearIcon, {
      'data-testid': 'datepicker-clear-icon',
      onClick: onClear
    });
  }
  if (isClearIconVisible && clearIcon && !React__default["default"].isValidElement(clearIcon)) {
    return jsxRuntime.jsx(semanticUiReact.Icon, {
      "aria-pressed": "false",
      "data-testid": "datepicker-clear-icon",
      link: true,
      name: clearIcon,
      onClick: onClear
    });
  }
  if (icon && React__default["default"].isValidElement(icon)) {
    return React__default["default"].cloneElement(icon, {
      'data-testid': 'datepicker-icon',
      onClick
    });
  }
  return jsxRuntime.jsx(semanticUiReact.Icon, {
    "data-testid": "datepicker-icon",
    name: icon
  });
};

const _excluded = ["clearIcon", "error", "icon", "isClearIconVisible", "label", "onClear", "onFocus", "required", "value", "fieldProps", "fieldRef", "children"];
const inputData = {
  'data-testid': 'datepicker-input'
};
const style = {
  position: 'relative'
};
// @ts-ignore
const CustomInput = /*#__PURE__*/React__default["default"].forwardRef((props, ref) => {
  const {
      clearIcon,
      error,
      icon,
      isClearIconVisible,
      label,
      onClear,
      onFocus,
      required,
      value,
      fieldProps,
      fieldRef,
      children
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return jsxRuntime.jsx(React__default["default"].Fragment, {
    children: jsxRuntime.jsxs(semanticUiReact.Form.Field, _extends({}, fieldProps, {
      style: style,
      ref: fieldRef,
      children: [label ? jsxRuntime.jsx("label", {
        htmlFor: rest.id,
        children: label
      }) : null, jsxRuntime.jsx(semanticUiReact.Input, _extends({}, rest, {
        ref: ref,
        error: error,
        required: required,
        icon: jsxRuntime.jsx(CustomIcon, {
          clearIcon: clearIcon,
          icon: icon,
          isClearIconVisible: isClearIconVisible,
          onClear: onClear,
          onClick: onFocus
        }),
        input: inputData,
        onFocus: onFocus,
        value: value
      })), children]
    }))
  });
});

// import localeJson from './locales/en-US.json';
const semanticInputProps = ['autoComplete', 'autoFocus', 'className', 'clearIcon', 'disabled', 'error', 'icon', 'iconPosition', 'id', 'label', 'loading', 'name', 'onBlur', 'onChange', 'onClick', 'onContextMenu', 'onDoubleClick', 'onFocus', 'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'placeholder', 'required', 'size', 'tabIndex', 'transparent', 'readOnly'];
const semanticFormFieldProps = ['disabled', 'error', 'inline', 'required', 'width'];
class SemanticDatepicker extends React__default["default"].Component {
  constructor() {
    super(...arguments);
    this.el = React__default["default"].createRef();
    this.inputRef = React__default["default"].createRef();
    this.state = this.initialState;
    this.Component = this.isRangeInput ? RangeDatePicker : DatePicker;
    this.resetState = event => {
      const {
        keepOpenOnClear,
        onChange
      } = this.props;
      const newState = {
        isVisible: keepOpenOnClear,
        selectedDate: this.isRangeInput ? [] : null,
        selectedDateFormatted: ''
      };
      if (keepOpenOnClear) {
        this.focusOnInput();
      }
      this.setState(newState, () => {
        onChange(event, _extends({}, this.props, {
          value: null
        }));
      });
    };
    this.clearInput = event => {
      this.resetState(event);
    };
    this.mousedownCb = mousedownEvent => {
      const {
        isVisible
      } = this.state;
      if (isVisible && this.el) {
        if (this.el.current && !this.el.current.contains(mousedownEvent.target)) {
          this.close();
        }
      }
    };
    this.keydownCb = keydownEvent => {
      const {
        isVisible
      } = this.state;
      if (keydownEvent.keyCode === keys.escape && isVisible) {
        this.close();
      }
    };
    this.close = () => {
      window.removeEventListener('keydown', this.keydownCb);
      window.removeEventListener('mousedown', this.mousedownCb);
      this.setState({
        isVisible: false
      });
    };
    this.focusOnInput = () => {
      var _this$inputRef;
      if ((_this$inputRef = this.inputRef) != null && _this$inputRef.current) {
        // @ts-ignore
        if (document.activeElement !== this.inputRef.current) {
          focus();
        }
      }
    };
    this.showCalendar = event => {
      const {
        onFocus
      } = this.props;
      onFocus(event);
      window.addEventListener('mousedown', this.mousedownCb);
      window.addEventListener('keydown', this.keydownCb);
      this.focusOnInput();
      this.setState({
        isVisible: true
      });
    };
    this.handleRangeInput = (newDates, event) => {
      const {
        displayFormat,
        keepOpenOnSelect,
        onChange,
        formatOptions
      } = this.props;
      if (!newDates || !newDates.length) {
        this.resetState(event);
        return;
      }
      const newState = {
        selectedDate: newDates,
        selectedDateFormatted: formatSelectedDate(newDates, displayFormat, formatOptions),
        typedValue: null
      };
      this.setState(newState, () => {
        onChange(event, _extends({}, this.props, {
          value: newDates
        }));
        if (newDates.length === 2) {
          this.setState({
            isVisible: keepOpenOnSelect
          });
        }
      });
    };
    this.handleBasicInput = (newDate, event) => {
      const {
        displayFormat,
        keepOpenOnSelect,
        onChange,
        formatOptions
      } = this.props;
      if (!newDate) {
        this.resetState(event);
        return;
      }
      const newState = {
        isVisible: keepOpenOnSelect,
        selectedDate: newDate,
        selectedDateFormatted: formatSelectedDate(newDate, displayFormat, formatOptions),
        typedValue: null
      };
      this.setState(newState, () => {
        onChange(event, _extends({}, this.props, {
          value: newDate
        }));
      });
    };
    this.handleBlur = event => {
      const {
        format,
        onBlur,
        onChange
      } = this.props;
      const {
        typedValue
      } = this.state;
      if (event) {
        onBlur(event);
      }
      if (!typedValue) {
        return;
      }
      if (this.isRangeInput) {
        const parsedValue = parseRangeOnBlur(String(typedValue), format);
        const areDatesValid = parsedValue.every(isValid__default["default"]);
        if (areDatesValid) {
          this.handleRangeInput(parsedValue, event);
          return;
        }
      } else {
        const parsedValue = parseOnBlur(String(typedValue), format);
        const isDateValid = isValid__default["default"](parsedValue);
        if (isDateValid) {
          this.handleBasicInput(parsedValue, event);
          return;
        }
      }
      this.setState({
        typedValue: null
      }, () => {
        onChange(event, _extends({}, this.props, {
          value: null
        }));
      });
    };
    this.handleChange = (event, _ref) => {
      let {
        value
      } = _ref;
      const {
        allowOnlyNumbers,
        format,
        onChange
      } = this.props;
      const formatString = this.isRangeInput ? format + " - " + format : format;
      const typedValue = allowOnlyNumbers ? onlyNumbers(value) : value;
      if (!typedValue) {
        const newState = {
          selectedDate: this.isRangeInput ? [] : null,
          selectedDateFormatted: '',
          typedValue: null
        };
        this.setState(newState, () => {
          onChange(event, _extends({}, this.props, {
            value: null
          }));
        });
        return;
      }
      this.setState({
        selectedDate: this.isRangeInput ? [] : null,
        selectedDateFormatted: '',
        typedValue: formatStringByPattern__default["default"](formatString, typedValue)
      });
    };
    this.handleKeyDown = evt => {
      if (evt.keyCode === keys.enter) {
        this.handleBlur();
      }
    };
    this.onDateSelected = (event, dateOrDates) => {
      if (this.isRangeInput) {
        this.handleRangeInput(dateOrDates, event);
      } else {
        this.handleBasicInput(dateOrDates, event);
      }
    };
  }
  componentDidUpdate(prevProps) {
    const {
      locale,
      value
    } = this.props;
    if (!isEqual__default["default"](value, prevProps.value)) {
      this.onDateSelected(undefined, value);
    }
    if (locale !== prevProps.locale) {
      this.setState({
        locale: this.locale
      });
    }
  }
  get isRangeInput() {
    return this.props.type === 'range';
  }
  get initialState() {
    const {
      displayFormat,
      value,
      formatOptions
    } = this.props;
    const initialSelectedDate = this.isRangeInput ? [] : null;
    return {
      isVisible: false,
      locale: this.locale,
      selectedDate: value || initialSelectedDate,
      selectedDateFormatted: formatSelectedDate(value, displayFormat, formatOptions),
      typedValue: null
    };
  }
  get dayzedProps() {
    return omit(semanticInputProps, this.props);
  }
  get inputProps() {
    const props = pick(semanticInputProps, this.props);
    const placeholder = props.placeholder !== undefined ? props.placeholder : this.props.format;
    return _extends({}, props, {
      placeholder
    });
  }
  get fieldProps() {
    const props = pick(semanticFormFieldProps, this.props);
    const className = this.props.fieldClassName !== undefined ? this.props.fieldClassName : null;
    return _extends({}, props, {
      className
    });
  }
  get date() {
    const {
      selectedDate
    } = this.state;
    const {
      date
    } = this.props;
    if (date || !selectedDate) {
      return date;
    }
    return this.isRangeInput ? selectedDate[0] : selectedDate;
  }
  get locale() {
    const {
      locale
    } = this.props;
    let localeJson;
    try {
      localeJson = require("./locales/" + locale + ".json");
    } catch (e) {
      console.warn("\"" + locale + "\" is not a valid locale");
      localeJson = require('./locales/en-US.json');
    }
    return localeJson;
  }
  get weekdays() {
    const {
      firstDayOfWeek
    } = this.dayzedProps;
    const {
      weekdays
    } = this.state.locale;
    return moveElementsByN(firstDayOfWeek, weekdays);
  }
  render() {
    const {
      isVisible,
      locale,
      selectedDate,
      selectedDateFormatted,
      typedValue
    } = this.state;
    const {
      clearable,
      pointing,
      filterDate,
      inline,
      inverted,
      readOnly,
      datePickerOnly
    } = this.props;
    const datepickerComponent = jsxRuntime.jsx(this.Component, _extends({}, this.dayzedProps, {
      monthsToDisplay: this.isRangeInput ? 2 : 1,
      onChange: this.onDateSelected,
      selected: selectedDate,
      date: this.date,
      children: props => jsxRuntime.jsx(Calendar, _extends({}, this.dayzedProps, props, locale, {
        filterDate: filterDate,
        inverted: inverted,
        pointing: pointing,
        weekdays: this.weekdays
      }))
    }));
    return inline ? datepickerComponent : jsxRuntime.jsx(CustomInput, _extends({}, this.inputProps, {
      isClearIconVisible: Boolean(clearable && selectedDateFormatted),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClear: this.clearInput,
      onFocus: readOnly ? null : this.showCalendar,
      onKeyDown: this.handleKeyDown,
      readOnly: readOnly || datePickerOnly,
      fieldProps: this.fieldProps,
      fieldRef: this.el,
      ref: this.inputRef,
      value: typedValue || selectedDateFormatted,
      children: isVisible && datepickerComponent
    }));
  }
}
SemanticDatepicker.defaultProps = {
  allowOnlyNumbers: false,
  autoFocus: false,
  clearIcon: 'close',
  clearOnSameDateClick: true,
  clearable: true,
  date: undefined,
  filterDate: () => true,
  firstDayOfWeek: 0,
  format: 'YYYY-MM-DD',
  displayFormat: 'YYYY-MM-DD',
  icon: 'calendar',
  id: undefined,
  inline: false,
  keepOpenOnClear: false,
  keepOpenOnSelect: false,
  label: undefined,
  locale: 'en-US',
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: undefined,
  pointing: 'left',
  readOnly: false,
  datePickerOnly: false,
  required: false,
  showToday: true,
  showOutsideDays: false,
  type: 'basic',
  value: null,
  inverted: false
};

exports["default"] = SemanticDatepicker;
//# sourceMappingURL=react-semantic-ui-datepickers.cjs.development.js.map
