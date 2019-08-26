import { MockedProvider, MockedProviderProps } from "@apollo/react-testing"
import * as enzyme from "enzyme"
import * as React from "react"

let mounts: enzyme.ReactWrapper[] = []

afterEach(() => {
  for (const m of mounts) {
    m.unmount()
  }
  mounts = []
})

/**
 * Helper function for mounting React components for testing. This helper does
 * two things: it wraps the given component with HOCs that provide necessary
 * context, such as `ApolloProvider`, and it automatically unmounts components
 * after each test.
 */
export function mount(
  element: React.ReactElement,
  {
    mocks = []
  }: {
    mocks?: MockedProviderProps["mocks"]
  } = {}
): enzyme.ReactWrapper {
  const wrapper = enzyme.mount(
    <MockedProvider mocks={mocks}>{element}</MockedProvider>
  )
  mounts.push(wrapper)
  return wrapper
}

/**
 * Produces a delay, and calls `.update()` on the given `ReactWrapper`. Use this
 * function when you want to wait for a component to update after an
 * asynchronous state change.
 *
 * @param wrapper Enzyme wrapper around a React component that will update
 * @param ms minimum number of milliseconds to wait
 */
export async function updates(
  wrapper: enzyme.ReactWrapper,
  ms: number = 0
): Promise<void> {
  await delay(ms)
  wrapper.update()
}

/**
 * Returns a promise that resolves after the given delay, measured in
 * milliseconds.
 */
export function delay(milliseconds: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
