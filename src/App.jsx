import React from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from 'styled-components';

library.add(fas);

const themes = {
  light: {
    sidebar: {
      background: {
        default: 'var(--color-sidebar-background-light-default)',
        hover: 'var(--color-sidebar-background-light-hover)',
        active: 'var(--color-sidebar-background-light-active)',
      },
      text: {
        default: 'var(--color-text-light-default)',
        hover: 'var(--color-text-light-hover)',
        active: 'var(--color-text-light-active)',
      },
      logo: {
        default: 'var(--color-text-logo-light-default)',
      },
      button: {
        background: {
          default: 'var(--color-button-background-light-default)',
          active: 'var(--color-button-background-light-active)',
        },
      },
    },
  },
  dark: {
    sidebar: {
      background: {
        default: 'var(--color-sidebar-background-dark-default)',
        hover: 'var(--color-sidebar-background-dark-hover)',
        active: 'var(--color-sidebar-background-dark-active)',
      },
      text: {
        default: 'var(--color-text-dark-default)',
        hover: 'var(--color-text-dark-hover)',
        active: 'var(--color-text-dark-active)',
      },
      logo: {
        default: 'var(--color-text-logo-dark-default)',
      },
      button: {
        background: {
          default: 'var(--color-button-background-dark-default)',
          active: 'var(--color-button-background-dark-active)',
        },
      },
    },
  },
};

export default class App extends React.Component{
  render () {
      return (
          <ThemeProvider theme={themes.light}>
            <Sidebar color="light" />
          </ThemeProvider>
      )
  }
}
