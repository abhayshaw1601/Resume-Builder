import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const ModernTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
	const formatDate = (dateStr) => {
		if (!dateStr || dateStr === "Invalid Date") return "";
		try {
			const date = new Date(dateStr);
			if (isNaN(date.getTime())) return dateStr;
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short"
			});
		} catch (e) {
			return dateStr;
		}
	};

	return (
		<div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} style={{ fontSize: fontSize || 16 }}>
			{/* Header */}
		<header className={`p-8 ${isDarkMode ? 'text-black' : 'text-gray-900'}`} style={{ background: accentBg || accentColor }}>
				<h1 className="font-light mb-3" style={{ fontSize: headingSize || 28 }}>
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.875em] ">
					{data.personal_info?.email && (
						<a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-2 hover:underline">
							<Mail className="size-4" />
							<span>{data.personal_info.email}</span>
						</a>
					)}
					{data.personal_info?.phone && (
						<a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:underline">
							<Phone className="size-4" />
							<span>{data.personal_info.phone}</span>
						</a>
					)}
					{data.personal_info?.location && (
						<a 
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:underline"
						>
							<MapPin className="size-4" />
							<span>{data.personal_info.location}</span>
						</a>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" rel="noopener noreferrer" href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} className="flex items-center gap-2 hover:underline">
							<Linkedin className="size-4" />
							<span className="break-all text-[0.75em]">{cleanUsername(data.personal_info.linkedin, 'linkedin')}</span>
						</a>
					)}
					{data.personal_info?.github && (
						<a target="_blank" rel="noopener noreferrer" href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} className="flex items-center gap-2 hover:underline">
							<Github className="size-4" />
							<span className="break-all text-[0.75em]">{cleanUsername(data.personal_info.github, 'github')}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" rel="noopener noreferrer" href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} className="flex items-center gap-2 hover:underline">
							<Globe className="size-4" />
							<span className="break-all text-[0.75em]">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
						<h2 className={`font-light mb-4 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{ fontSize: headingSize ? headingSize * 0.65 : 18 }}>
							Professional Summary
						</h2>
						<p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} `}>{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
						<h2 className={`font-light mb-6 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{ fontSize: headingSize ? headingSize * 0.65 : 18 }}>
							Experience
						</h2>

						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index} className={`relative pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>

									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className={`text-xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.position}</h3>
											<p className="font-medium" style={{ color: accentColor }}>
												{exp.link
													? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
													: exp.company
												}
											</p>
										</div>
										<div className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'} px-3 py-1 rounded`}>
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mt-3 whitespace-pre-line`}>
											{exp.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects */}
				{data.project && data.project.length > 0 && (
					<section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
						<h2 className={`font-light mb-4 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{ fontSize: headingSize ? headingSize * 0.65 : 18 }}>
							Projects
						</h2>

						<div className="space-y-6">
							{data.project.map((p, index) => (
								<div key={index} className={`relative pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{borderLeftColor: accentColor}}>
									<div className="flex items-center gap-2">
										<h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{p.name}</h3>
										{p.link && (
											<a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="text-[0.75em] hover:underline">↗ Link</a>
										)}
									</div>
									{p.type && <p className="text-[0.75em] text-gray-400 mb-1">{p.type}</p>}
									{p.description && (
										<div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-[0.875em] mt-3`}>{p.description}</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className={`font-light mb-4 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{ fontSize: headingSize ? headingSize * 0.65 : 18 }}>
								Education
							</h2>

							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p style={{ color: accentColor }}>{edu.institution}</p>
										<div className={`flex justify-between items-center text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className={`font-light mb-4 pb-2 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} style={{ fontSize: headingSize ? headingSize * 0.65 : 18 }}>
								Skills
							</h2>

							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 text-[0.875em] text-white rounded-full"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;

