function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div className="text-center py-20 text-xl" role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className="btn btn-primary mt-9" onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  export default ErrorFallback