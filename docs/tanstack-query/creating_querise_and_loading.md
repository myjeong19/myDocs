# TanStack Query

- TanStack Query는 클라이언트에서 서버 데이터 캐시를 관리한다.  
  React 에서, 서버 데이터가 필요할 때 axios, fetch를 사용해 바로 요청하지 않고,  
  TanStack Query 캐시를 요청한다.

## 클라이언트 상태와 서버 상태

### 클라이언트 상태 (Client State)

- 웹 브라우저 세션과 관련된 모든 정보를 의미한다.
  예) 다크모드와 같이 사용자의 상태를 추적하는 것

### 서버 상태 (Server State)

- 서버에 저장되지만, 클라이언트에 표시하는데 필요한 데이터를 의미한다.

## 역할

- TanStack Query 클라이언트를 어떻게 구성했느냐에 따라,  
  해당 캐시의 데이터를 유지 관리하는 것이다.
- 데이터를 관리하는 것은 TanStack Query이지만,  
  서버의 새 데이터로 캐시를 업데이트 하는 시기를 설정하는 건 사용자의 몫이다.

- 예를 들어, 캐시에는 blog-posts라는 키를 할당한 데이터가 있는 경우,  
  이 키는 데이터가 식별되는 방식이다.  
  클라이언트 캐시에 있는 이 데이터가, 서버의 데이터와 일치하는 지 확인하는 방법은 두 가지가 있다.

  1. 명령형으로 처리하는 방법  
     쿼리 클라이언트에 이 데이터를 무효화하고,  
     캐시에 교체할 새 데이터를 서버에서 가져오게 지시하는 방법

  2. 선언형으로 처리하는 방법  
     리페치(refetch)를 트리거하는 조건을 구성하는 방법 혹은  
     `staleTime`으로 다시 가져오기를 언제 트리거 할지도 구성하는 방법이 있다.

- TanStack Query는 데이터 관리 뿐만 아니라, 서버 상태 관리에 도움되는 많은 도구가 제공되며,  
  서버에 대한 모든 쿼리의 로딩 및 오류 상태를 유지해주기 때문에, 수동으로 할 필요가 없어진다.

- 또한, 사용자 데이터를 위해 데이터의 페이지 매김(Pageination) 또는 무한 스크롤이 필요한 경우,  
  데이터를 조각으로 가져올 수 있는 도구도 제공한다.

- 사용자가 언제 이를 필요로 할지, 예상해 프리페치(Prefetch)를 수행할 수도 있다.  
  데이터를 미리 가져와 캐시에 넣기에, 사용자에게 데이터가 필요할 때 사용자는 서버에 연결을 기다릴 필요가 없어진다.
- 데이터의 변이나, 업데이트를 관리할 수도 있다.

- 쿼리는 키로 식별되기에, TanStack Query는 요청을 관리할 수 있고,  
  페이지를 로드하고, 해당 페이지의 여러 구성 요소가, 동일한 데이터를 요청하는 경우  
  TanStack Query는 이를 한번에 보낼 수 있다.

- 기존 쿼리가 나가는 동안, 다른 구성 요소가 데이터를 요청하는 경우 또한,  
  TanStack Query는 중복 요청을 제거할 수도 있다.

- 서버에서 오류가 발생하는 경우에 대한, 재시도를 관리할 수 있다.

- 쿼리의 성공 혹은 오류를 구별해, 조치를 취할 수 있도록 콜백을 전달할 수도 있다.

## TanStack Query 컨셉

- 페칭 데이터 (Fetching data)

- 로딩과 에러 상태 (Loading / error states)

- 페이지네이션 (Pagination)

- 미리 가져오기 (Prefetching)

- 변이 (Mutation)

## `QueryClient`와, `QueryClientProbider`

- 쿼리를 관리하고, 서버 데이터도 저장하는 클라이언트

- 쿼리, 캐시, 그리고 쿼리 캐시를 조작하는 도구가 속하지만, 대개 직접적으로 사용하진 않는다.
  - 대신 `QueryClientProvider`를 사용한다.
    - `QueryClientProvider`의 자식 컴포넌트가 TanStack Query 훅을 사용한다.

```jsx
// 1. import QueryClient, QueryClientProbider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. create QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'> ... </div>
    </QueryClientProvider>
  );
}
```

- `QueryClientProvider`자식은 캐시를 포함한 쿼리클라이언트에 접근 가능하다.

  - 자식 컴포넌트에 캐시 및 클라이언트 구성을 제공하는 쿼리 공급자
  - Provider는 query client를 값으로 사용한다.

## `useQuery`

- `useQuery` 훅을 사용하면 서버에서 데이터를 받을 수 있다.

  - `useQuery`는 많은 속성을 가진 객체를 반환한다.

    - 객체의 `data` 속성은 `useQuery`에 전달할 쿼리 함수의 반환 값이다.

      ```jsx
      const { data } = useQuery();
      ```

- `useQuery`는 옵션 객체를 받는다.

  - 옵션 객체의 `queryKey` 속성은 쿼리 캐시 내의 데이터를 정의한다.
    - React Query 4버전 이상 부터 `queryKey`의 값은 항상 배열이다.
  - 옵션 객체의 `queryFn` 속성의 값은 데이터를 가져오기 위해 호출할 함수이다.

    ```jsx
    const { data } = useQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
    });
    ```

- 이때, data는 비동기 함수 fetch posts의 결과를 반환 후, 정의되므로,

  - `Uncaught TypeError: Cannot read properties of undefined (reading 'map')` 오류가 반환된다.

- React Query 훅을 사용하지 않는 방법으로 data의 유무를 확인하는 방법이있다.

  ```jsx
  if (!data) {
    return <div />;
  }
  ```

### `isLoading`과, `isError`

- `isLoading`과, `isError`은 데이터 로딩중, 혹은 에러 발생 여부를 알려주는 부울 값이다.

  - `isLoading`은 페이지가 로딩 중인 경우 true, 아닌 경우 false를 반환한다.

#### `isLoading`과,`isFetching`의 차이점

- `isFetching`은 비동기 쿼리가 아직 해결되지 않았음을 의미한다.

  - 아직 fetch가 완료되지 않았지만, Axios 호출이나 GraphQL 호출 같은 다른 종류의 데이터를 가져오는 작업일 수 있다.

- `isLoading`은 그 하위 집합으로, 로딩 중을 의미한다.
  - 쿼리 함수가 아직 미해결이지만, 캐시된 데이터도 없음을 의미한다.

별 차이가 없어보이지만, 페이지네이션 같은 경우 캐시된 데이터의 유무를 구분하는 것이 중요하다.

```jsx
if (isLoading) {
  return <h3>Loading ...</h3>;
}
```

#### `isError`

- 쿼리 함수를 통해 fetchPosts에서 오류가 발생한 경우, data는 undefined이다.  
  그때, isError를 활용해, 오류 화면을 렌더링할 수 있다.

```jsx
if (isError) {
  return <h3>Oops, something went wrong</h3>;
}
```

- 하지만, 오류 화면은 즉각적으로 렌더링 되지 않는데, 이러한 이유는,
  시스템이 쿼리함수를 여러번 시도하기 때문이다.

  - 기본적으로 React Query는 세 번의 시도에도 데이터를 가져 올 수 없을 때, 오류를 발생시킨다.

    - `error` 속성을 사용하면 오류 객체를 반환하며, 실제 오류 내용을 알 수 있다.

    ```jsx
    return <h3>{error.toString()}</h3>;
    ```

## 개발자 도구

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

...
function App () {
  return (
    <QueryClientProvider client={queryClient}>
      ...
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
```

- stale: 오래된 상태

  - 데이터가 오래됐다는건, 유효기간이 만료됨과,
    다시 가져올 준비된 상태를 의미한다.
  - 데이터가 stale로 표시되어도, 캐시에서 삭제된 것은 아니다. 즉, 데이터는 여전히 캐시에 있다.

    - 그저, 데이터를 다시 검증해야한다는 의미이다.

  - prefetch는 데이터가 stale일 때만 트리거 된다.

    - 자동 데이터 prefetch는 몇가지 트리거가 있다.
      - 트리거의 예시로 쿼리를 포함하는 컴포넌트가 다시 마운트 되거나 혹은, 브라우저 창이 리포커싱 될 때가 있다.

  - stale 시간을 데이터의 최대 수명으로 생각할 수도 있다.

- 옵션 객체의 속성 `staleTime`의 값은 밀리초 단위 시간이다.

  - 데이터가 stale이 되면, refetch 트리거에 의해 서버에서 데이터를 다시 가져온다.
  - Lindsley는 React Query의 stale시간이 기본적으로 0밀리세컨드라고 주장했다.

### `staleTime`과, `gcTime`의 차이

- `staleTime`은 데이터를 다시 가져와야 할 때를 알려주고, `gcTime`은 데이터를 캐시에 유지할 시간을 결정한다.
  - 데이터와 연관된 활성 `useQuery`가 없고, 데이터가 현재 페이지에 표시되어 있지 않는 경우,  
    데이터는 콜드 스토리지 상태에 들어가게 되는데, 이때 유효기간이 `gcTime`이다.
    - `gcTime`이 만료되면 데이터는 캐시에서 사라지게 되며, 기본 `gcTime`의 값은 5분이다.
    - `gcTime`은 데이터가 페이지에 표시되지 않을 때 부터 시간이 측정된다.
    - `gcTime`이 만료되면 데이터는 gc처리 되며, TanStack Query에서 더 이상 사용할 수 없다.

### `staleTime`과, `gcTime`의 조합

- 예를 들어, 데이터가 fresh이며, `staleTime`이 남고, 캐시가 있으며,  
  `gcTime`도 만료되지 않은 경우, 데이터를 refetch 하지 않고, 캐시된 데이터를 표시한다.

  - refetch는 트리거가 발생할 때만 실행된다.

- 데이터가 stale이고 캐시에 있는 경우, refetch 트리거가 발생하면  
  서버에서 새 데이터를 가져올 때 까지, 캐시된 데이터를 표시한다.

- 데이터가 캐시에 없고, `gcTime`이 만료되어 데이터가 삭제 된 경우,  
  데이터를 새로 가져오는 동안 표시할 데이터가 없게 된다.

- 서버에서 데이터를 가져오기 전까지 쿼리는 어떠한 데이터도 반환하지 않고,  
  데이터가 캐시에 있을 때는 `useQuery`는 필요한 조건에 따라,
  캐시된 데이터를 반환하고 refetch한다.
