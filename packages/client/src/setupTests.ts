/**
 * This module runs before the Jest test suite. Create-react-app is set up to
 * find this module automatically. If you are not using CRA you may need to
 * create a `jest.config.js` file, and include a configuration option to specify
 * a test setup module.
 */

import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "jest-enzyme"
import React from "react"
import { act } from "react-dom/test-utils"

configure({ adapter: new Adapter() })

// The monkey patches below avoid a warning when testing components that use
// react-apollo hooks.
//
// A React component may be updated from outside of the render context when an
// update is called asynchronously. For example the `useQuery` hook from
// react-apollo has this line:
//
//     const [_ignored, forceUpdate] = useReducer(x => x + 1, 0);
//
// When the GraphQL query completes there is some code that calls `forceUpdate`
// to make the component re-render. There are similar updaters called
// `setResult` in `useMutation` and `useSubscription`.
//
// When running tests React expects any call that updates a component "from the
// outside" to be wrapped in a call to `act` from `react-dom/test-utils`.
// Otherwise React dispalys a big ugly warning in test output. Unfortunately
// react-apollo does not export code to make it easy to wrap `forceUpdate` or
// `setResult`. So we are going to use some creative monkey-patching to make
// that happen.

// monkey-patch `forceUpdate` callback of `useQuery`
const useReducer = React.useReducer
React.useReducer = ((reducer: Function, init: unknown) => {
  const [value, dispatch] = useReducer(reducer as any, init)
  return [
    value,
    (...args: any[]) => {
      act(() => {
        ;(dispatch as any)(...args)
      })
    }
  ]
}) as typeof useReducer

// monkey-patch `setResult` callback of `useMutation` and `useSubscription`
const useState = React.useState
React.useState = ((init: any) => {
  const [value, setter] = useState(init)
  return [
    value,
    (...args: any[]) => {
      act(() => {
        ;(setter as any)(...args)
      })
    }
  ]
}) as typeof useState
