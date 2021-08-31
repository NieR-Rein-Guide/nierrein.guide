import React from 'react'

// TODO: i dont know which types to put here
export class ShadowRoot extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  attachShadow(host) {
    if (host == null) {
      return
    }
    host.attachShadow({ mode: 'open' })
    host.shadowRoot.innerHTML = host.innerHTML
    host.innerHTML = ''
  }

  render() {
    return (
      <span className={this.props.className} ref={this.attachShadow}>
        {this.props.children}
      </span>
    )
  }
}
