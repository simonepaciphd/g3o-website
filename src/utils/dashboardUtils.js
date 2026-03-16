const LEVEL_ORDER = ['national', 'subnational', 'unknown'];
const BRANCH_ORDER = ['executive', 'legislative', 'judicial', 'unknown'];
const collator = new Intl.Collator('en', { sensitivity: 'base' });

function compareByOrder(left, right, order) {
  return order.indexOf(left) - order.indexOf(right);
}

function sortRegionNodes(regions) {
  return regions.sort((left, right) => {
    if (left.kind === 'national' && right.kind !== 'national') {
      return -1;
    }

    if (right.kind === 'national' && left.kind !== 'national') {
      return 1;
    }

    if (left.kind === 'unspecified' && right.kind !== 'unspecified') {
      return 1;
    }

    if (right.kind === 'unspecified' && left.kind !== 'unspecified') {
      return -1;
    }

    return collator.compare(left.label, right.label);
  });
}

function incrementNodeCounts(node, institution) {
  node.count += 1;

  if (institution.hasGenaiActivity === 'yes') {
    node.documentedCount += 1;
  }
}

export function formatList(values, emptyLabel = '\u2014') {
  return values?.length ? values.join(', ') : emptyLabel;
}

export function formatSignal(value) {
  if (value === 'yes') {
    return 'Yes';
  }

  if (value === 'no') {
    return 'No';
  }

  return 'Unknown';
}

export function buildInstitutionHierarchy(institutions) {
  const countries = new Map();

  for (const institution of institutions) {
    if (!countries.has(institution.country)) {
      countries.set(institution.country, {
        key: institution.country,
        label: institution.country,
        count: 0,
        documentedCount: 0,
        levels: new Map(),
      });
    }

    const countryNode = countries.get(institution.country);
    incrementNodeCounts(countryNode, institution);

    if (!countryNode.levels.has(institution.levelKey)) {
      countryNode.levels.set(institution.levelKey, {
        key: institution.levelKey,
        label: institution.levelLabel,
        count: 0,
        documentedCount: 0,
        branches: new Map(),
      });
    }

    const levelNode = countryNode.levels.get(institution.levelKey);
    incrementNodeCounts(levelNode, institution);

    if (!levelNode.branches.has(institution.branchKey)) {
      levelNode.branches.set(institution.branchKey, {
        key: institution.branchKey,
        label: institution.branchLabel,
        count: 0,
        documentedCount: 0,
        regions: new Map(),
      });
    }

    const branchNode = levelNode.branches.get(institution.branchKey);
    incrementNodeCounts(branchNode, institution);

    const regionKey = `${institution.regionKind}:${institution.regionLabel}`;

    if (!branchNode.regions.has(regionKey)) {
      branchNode.regions.set(regionKey, {
        key: regionKey,
        label: institution.regionLabel,
        kind: institution.regionKind,
        count: 0,
        documentedCount: 0,
        institutions: [],
      });
    }

    const regionNode = branchNode.regions.get(regionKey);
    incrementNodeCounts(regionNode, institution);
    regionNode.institutions.push(institution);
  }

  return [...countries.values()]
    .sort((left, right) => collator.compare(left.label, right.label))
    .map((countryNode) => ({
      ...countryNode,
      levels: [...countryNode.levels.values()]
        .sort((left, right) => compareByOrder(left.key, right.key, LEVEL_ORDER))
        .map((levelNode) => ({
          ...levelNode,
          branches: [...levelNode.branches.values()]
            .sort((left, right) => compareByOrder(left.key, right.key, BRANCH_ORDER))
            .map((branchNode) => ({
              ...branchNode,
              regions: sortRegionNodes([...branchNode.regions.values()]).map((regionNode) => ({
                ...regionNode,
                institutions: regionNode.institutions.sort((left, right) =>
                  collator.compare(left.name, right.name),
                ),
              })),
            })),
        })),
    }));
}
