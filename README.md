# Custom Version Bump Action

This GitHub Action automatically detects the current version from git tags and increments it based on the specified version fragment.

## Inputs

- `version-fragment`: The version fragment to increment (`major`, `feature`, `bug`, `alpha`, `beta`, `pre`).

## Outputs

- `next-version`: The incremented version number.

## Usage

```yaml
steps:
  - name: Checkout Code
    uses: actions/checkout@v2

  - name: Bump Release Version
    id: bump_version
    uses: Ntezi/custom-version-bump-action@main
    with:
      version-fragment: 'alpha' # other options: major, feature, bug, alpha, beta, pre

  - name: Use Next Version
    run: echo "Next version is ${{ steps.bump_version.outputs.next-version }}"

```
### Structure

````
custom-version-bump-action/
│
├── action.yml        # Action metadata file
├── index.js          # Main script file
├── package.json      # Node.js dependencies
└── README.md         # Documentation
````