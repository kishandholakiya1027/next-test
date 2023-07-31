import React, { Component } from 'react'

//higher order component
const withLoading = (WrappedComponent) => {
    return class extends Component {
        render() {
            const { isLoading, ...restProps } = this.props;

            return <>
                {isLoading ? <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-200 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div> : null}

                <WrappedComponent {...restProps} />
            </>
        }
    };
}

export default withLoading