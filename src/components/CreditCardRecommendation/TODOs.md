# TODOs

feedback from 23 Nov 1

- [ ] breakdown useDragDirection hook -> to not expose inner state related setters(e.g. setIsMouseDown, setIsMouseDragging, setDragDirection)
- [ ] resolve type any for useDragDirection's generic
- [ ] resolve type `Function` for touchy
- [ ] refactor CreditCardRecommendation -> 1. break down and abstract each components in a context of creating a global cylinder carousel component OR 2. do not use React.Context since this is currently occuring circluar dependencies
- [ ] do not expose opacity related logics for MetaData styling
