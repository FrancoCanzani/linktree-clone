import React from 'react';

function LegendComponent({ technologies }) {
  // Sort technologies in descending order based on bytesUsed
  technologies.sort((a, b) => b.bytesUsed - a.bytesUsed);

  const totalBytes = technologies.reduce(
    (total, tech) => total + tech.bytesUsed,
    0
  );

  // Realistic color mapping for technologies
  const technologyColors = {
    HTML: 'bg-blue-500',
    TypeScript: 'bg-indigo-500',
    CSS: 'bg-pink-500',
    JavaScript: 'bg-yellow-500',
    React: 'bg-teal-500',
    Python: 'bg-green-500',
    Java: 'bg-orange-500',
    Ruby: 'bg-red-500',
    PHP: 'bg-purple-500',
    Go: 'bg-blue-600',
    Rust: 'bg-orange-600',
    C: 'bg-green-600',
    CPlusPlus: 'bg-pink-600',
    Swift: 'bg-red-600',
    Kotlin: 'bg-indigo-600',
    Other: 'bg-gray-500', // Default color for unmatched technologies
  };

  // Calculate the percentage of bytes for each technology
  technologies.forEach((tech) => {
    tech.percent = (tech.bytesUsed / totalBytes) * 100;
  });

  // Function to generate a color class based on the name of the technology
  const getColorClass = (name) => {
    return technologyColors[name] || technologyColors['Other']; // Use default color for unmatched technologies
  };

  let leftOffset = 0; // To track the left position for each technology span

  return (
    <div className='mt-4'>
      {/* Bar */}
      <div className='w-full h-2 bg-gray-300 rounded-md relative'>
        {technologies.map((tech, index) => {
          const style = { width: `${tech.percent}%`, left: `${leftOffset}%` };
          leftOffset += tech.percent;
          return (
            <span
              key={index}
              className={`h-full absolute top-0 ${getColorClass(tech.name)}`}
              style={style}
            ></span>
          );
        })}
      </div>

      {/* Technology list */}
      <div className='mt-2 flex gap-2'>
        {technologies.map((tech, index) => (
          <div key={index} className='flex items-center'>
            <span
              className={`${getColorClass(
                tech.name
              )} w-2 h-2 rounded-full mr-2`}
            ></span>
            <span className='text-xs'>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LegendComponent;
