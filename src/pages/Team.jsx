import { teamMembers, researchAssistants } from '../data/team';
import SectionHeading from '../components/common/SectionHeading';
import TeamCard from '../components/common/TeamCard';
import CTABlock from '../components/common/CTABlock';

function Team() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">Our Team</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            G3O is led by a team of political scientists and policy researchers committed to
            building transparent, high-quality evidence on government AI adoption.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Principal Investigators */}
        <section>
          <SectionHeading title="Principal Investigators" />
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Research Assistants */}
        <section>
          <SectionHeading title="Research Assistants" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {researchAssistants.map((name) => (
              <div
                key={name}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center"
              >
                <p className="font-medium text-gray-800">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <CTABlock
          title="Join Us"
          description="G3O is growing. We welcome researchers, data scientists, and policy analysts who share our commitment to transparent measurement of government AI adoption."
          buttonText="Get in touch"
          buttonLink="/contact"
          variant="blue"
        />
      </div>
    </div>
  );
}

export default Team;
