import { useEffect } from "react"
import ErrorMessage from "../../components/ErrorMessage"
import Spinner from "../../components/Spinner"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { clearJokesError, loadJokes, setNumberOfJokes } from "../../store/jokesReducer"
import "./jokes-page.css"

export default function JokesPage() {
  const dispatch = useAppDispatch()
  const { jokes, status, error, numberOfJokes } = useAppSelector((state) => state.jokes)
  const isPending = status === "idle" || status === "pending"

  useEffect(() => {
    if(jokes.length > 0) return;
    dispatch(loadJokes())
  }, [dispatch])

  return (
    <section className="jokes-page" aria-busy={isPending}>
      <header className="jokes-page__header">
        <h1>Jokes</h1>
        <p className="jokes-page__subtitle">
          {numberOfJokes} random jokes, loaded through Redux.
        </p>
      </header>

      <div className="jokes-page__actions">
        <button
          type="button"
          className="jokes-page__reload"
          aria-label="Load new jokes"
          disabled={isPending}
          onClick={() => {
            dispatch(loadJokes())
          }}
        >
          {isPending ? "Loading jokes…" : "Load new jokes"}
        </button>
        <input type="number" max={100} min={1} value={numberOfJokes} onChange={(e) => {
          const n = Number(e.target.value);
          if(isNaN(n) || n > 100) {
            return;
          }
          dispatch(setNumberOfJokes(Number(e.target.value)))
        }} />
      </div>

      <ErrorMessage
        title="Could not load jokes"
        message={status === "failed" ? error : ""}
        onDismiss={() => {
          dispatch(clearJokesError())
        }}
      />

      {isPending && <Spinner message="Loading jokes…" />}

      {status === "succeeded" && (
        <div className="jokes-page__grid">
          {jokes.map((joke) => (
            <article key={joke.id} className="joke-card">
              <p className="joke-card__type">{joke.type}</p>
              <h2 className="joke-card__setup">{joke.setup}</h2>
              <p className="joke-card__punchline">{joke.punchline}</p>
            </article>
          ))}
        </div>
      )}

      {status === "failed" && (
        <p className="jokes-page__empty">No jokes loaded. Try again.</p>
      )}
    </section>
  )
}
