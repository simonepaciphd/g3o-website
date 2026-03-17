import pilotDashboardData from './pilotDashboardData.json';

function normalizeCountryKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(the|of|and)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const COUNTRY_ALIASES = new Map([
  ['united states america', 'united states'],
  ['united states of america', 'united states'],
  ['turkiye', 'turkey'],
  ['democratic republic congo', 'democratic republic of congo'],
  ['republic congo', 'congo'],
  ['czechia', 'czech republic'],
  ['ivory coast', "cote d'ivoire"],
  ['cote divoire', "cote d'ivoire"],
  ['republic moldova', 'moldova'],
  ['united republic tanzania', 'tanzania'],
  ['syrian arab republic', 'syria'],
  ['cape verde', 'cabo verde'],
  ['gambia', 'gambia'],
  ['the gambia', 'gambia'],
  ['russian federation', 'russia'],
  ['eswatini', 'swaziland'],
  ['viet nam', 'vietnam'],
]);

function resolveCountryKey(value) {
  const key = normalizeCountryKey(value);
  return COUNTRY_ALIASES.get(key) || key;
}

function createResolvedCountrySet(values) {
  return new Set(values.map((value) => resolveCountryKey(value)));
}

const institutions = pilotDashboardData.institutions;
const pilotReviewedInstitutions = institutions.filter((institution) => institution.recordOrigin !== 'master');
const pilotAddedInstitutions = institutions.filter((institution) => institution.recordOrigin === 'pilot');
const existingSourceLinkedInstitutions = institutions.filter((institution) => Boolean(institution.masterRecord));
const documentedActivityInstitutions = institutions.filter(
  (institution) => institution.hasGenaiActivity === 'yes',
);
const pilotAddedDocumentedActivityInstitutions = pilotAddedInstitutions.filter(
  (institution) => institution.hasGenaiActivity === 'yes',
);

const fullDatabaseCountries = createResolvedCountrySet(
  institutions.map((institution) => institution.country),
);
const pilotCountries = createResolvedCountrySet(
  pilotReviewedInstitutions.map((institution) => institution.country),
);
const existingSourceCountries = createResolvedCountrySet(
  existingSourceLinkedInstitutions.map((institution) => institution.country),
);
const pilotAddedCountries = createResolvedCountrySet(
  pilotAddedInstitutions.map((institution) => institution.country),
);
const pilotAddedDocumentedActivityCountries = createResolvedCountrySet(
  pilotAddedDocumentedActivityInstitutions.map((institution) => institution.country),
);

const countryCoverageMap = new Map();

for (const institution of institutions) {
  const key = resolveCountryKey(institution.country);

  if (!countryCoverageMap.has(key)) {
    countryCoverageMap.set(key, {
      country: institution.country,
      totalInstitutions: 0,
      pilotReviewedInstitutions: 0,
      pilotAddedInstitutions: 0,
      documentedActivityInstitutions: 0,
      namedActivities: 0,
    });
  }

  const entry = countryCoverageMap.get(key);
  entry.totalInstitutions += 1;
  entry.namedActivities += institution.activityCount || 0;

  if (institution.recordOrigin !== 'master') {
    entry.pilotReviewedInstitutions += 1;
  }

  if (institution.recordOrigin === 'pilot') {
    entry.pilotAddedInstitutions += 1;
  }

  if (institution.hasGenaiActivity === 'yes') {
    entry.documentedActivityInstitutions += 1;
  }
}

export const countryCoverage = [...countryCoverageMap.values()].sort((left, right) =>
  left.country.localeCompare(right.country),
);

const countryCoverageLookup = new Map(
  countryCoverage.map((entry) => [resolveCountryKey(entry.country), entry]),
);

export function getCountryCoverage(countryName) {
  return countryCoverageLookup.get(resolveCountryKey(countryName)) || null;
}

export const homeStats = {
  institutions: institutions.length,
  countries: fullDatabaseCountries.size,
  cases: pilotDashboardData.meta.activityCount,
};

export const dashboardOverview = {
  totalInstitutions: institutions.length,
  totalCountries: fullDatabaseCountries.size,
  pilotReviewedInstitutions: pilotReviewedInstitutions.length,
  pilotCountries: pilotCountries.size,
  pilotAddedInstitutions: pilotAddedInstitutions.length,
  pilotAddedCountries: pilotAddedCountries.size,
  existingSourceLinkedInstitutions: existingSourceLinkedInstitutions.length,
  existingSourceCountries: existingSourceCountries.size,
  matchedPilotAndExistingSourceInstitutions: institutions.filter(
    (institution) => institution.recordOrigin === 'pilot+master',
  ).length,
  documentedActivityInstitutions: documentedActivityInstitutions.length,
  documentedActivityCountries: new Set(
    documentedActivityInstitutions.map((institution) => resolveCountryKey(institution.country)),
  ).size,
  namedActivities: pilotDashboardData.meta.activityCount,
  pilotAddedDocumentedActivityInstitutions: pilotAddedDocumentedActivityInstitutions.length,
  pilotAddedDocumentedActivityCountries: pilotAddedDocumentedActivityCountries.size,
  existingSourceOnlyInstitutions: institutions.filter(
    (institution) => institution.recordOrigin === 'master',
  ).length,
};
