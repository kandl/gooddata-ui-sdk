# Component Rules

## Naming

The component name should match its file name.

```tsx
./UiButton.tsx -> <UiButton />
```

## Collocation

Each component should be collocated with its own styles.

```tsx
./UiButton.tsx
./UiButton.scss
```

## Interfaces

TBD

## Styles

Styles should follow the [BEM](https://en.bem.info/methodology/quick-start/) methodology.

Follow these rules:
- Use prefixes for root elements to avoid class name collisions (e.g., `.gd-kit-ui-button`, `.gd-kit-ui-icon`).
- Minimize nesting and overrides for better readability and maintainability
- Avoid using margins for root elements; components should not affect the layout of their parent or sibling elements.
- Limit overrides to local use and avoid them whenever possible; external overrides should not be applied.

### Basic Style

```tsx
const { b } = bem("gd-kit-ui-button");

<button className={b()}>
```

```scss
.gd-kit-ui-button {
    // component styles
}
```

### Style Based on Boolean Props

```tsx
interface IProps {
    isSelected: boolean;
}

const { b } = bem("gd-kit-ui-button");

<button className={b({ isSelected })}>
```

```scss
.gd-kit-ui-button {
    // component styles

    &--isSelected {
        // styles when isSelected is true
    }
}
```

### Style Based on String Props

```tsx
interface IProps {
    style: "primary" | "secondary",
}

const { b } = bem("gd-kit-ui-button");

<button className={b({ style })}>
```

```scss
.gd-kit-ui-button {
    // component styles

    &--style {
        &-primary {
            // styles for primary variant
        }
    
        &-secondary {
            // styles for secondary variant
        }
    }
}
```

### Combined Style Overrides
*Note: Avoid overrides when possible, as they reduce readability and maintainability. Prefer top-level derived styles, but use overrides if absolutely necessary.*

```tsx
interface IProps {
    isSelected: boolean;
    style: "primary" | "secondary",
}

const { b } = bem("gd-kit-ui-button");

<button className={b({ style, isSelected })}>
```

```scss
.gd-kit-ui-button {
    // component styles
    $root: &;

    &--style {
        &-primary {
            // styles for primary variant

            &#{$root}--isSelected {
                // combined styles for primary and isSelected
            }
        }
    
        &-secondary {
            // styles for secondary variant

            &#{$root}--isSelected {
                // combined styles for secondary and isSelected
            }
        }
    }
}
```

### Nested Element Styles

```tsx
const { b, e } = bem("gd-kit-ui-button");

<button className={b()}>
    <span className={e("icon")} />
</button>
```

```scss
.gd-kit-ui-button {
    // component styles
    
    &__icon {
        // styles for nested element
    }
}
```

### Nested Element Styles Based on Props

```tsx
interface IProps {
    isSelected: boolean;
    style: "primary" | "secondary",
}

const { b, e } = bem("gd-kit-ui-button");

<button className={b()}>
    <span className={e("icon", { isSelected, style })} />
</button>
```

```scss
.gd-kit-ui-button {
    // component styles

    &__icon {
        // styles for nested element

        &--isSelected {
            // styles when isSelected is true
        }

        &--style {
            &-primary {
                // styles for primary variant
            }
        
            &-secondary {
                // styles for secondary variant
            }
        }
    }
}
```

### Nested Element Style Overrides
*Note: Avoid overrides when possible, as they reduce readability and maintainability. Prefer top-level derived styles, but use overrides if necessary.*

```tsx
interface IProps {
    isSelected: boolean;
}

const { b, e } = bem("gd-kit-ui-button");

<button className={b({ isSelected })}>
    <span className={e("icon")} />
</button>
```

```scss
.gd-kit-ui-button {
    // component styles
    $root: &;

    &__icon {
        // styles for nested element
    }

    &--isSelected {
         &#{$root}__icon {
            // style overrides for icon when isSelected is true
        }
    }

    &:active {
        &#{$root}__icon {
            // style overrides for icon when active
        }
    }
    
}
```

## Accessibility
TBD

## Theming

TBD

## Layout

TBD

## Localization

TBD

## Storybook and Screenshot Tests

TBD
