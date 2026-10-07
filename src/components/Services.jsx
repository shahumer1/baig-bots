import "./Services.css";

function Services() {
  const services = [
    {
      number: "01",
      title: "Software Development",
      text: "Custom websites, web apps and digital platforms built around your business needs.",
      icon: "</>",
    },
    {
      number: "02",
      title: "Automation Solutions",
      text: "Smart automation systems that reduce repetitive work and improve efficiency.",
      icon: "⚙",
    },
    {
      number: "03",
      title: "AI Solutions",
      text: "AI-powered tools, assistants and intelligent workflows designed to help businesses scale.",
      icon: "AI",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-bg-grid"></div>

      <div className="services-container">
        <div className="services-heading">
          <span>WHAT WE DO</span>

          <h2>
            Services Built for
            <br />
            <strong>Modern Businesses.</strong>
          </h2>

          <p>
            From custom software to intelligent automation, we create
            solutions designed to make your business faster, smarter and
            easier to scale.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span className="service-number">{service.number}</span>

                <div className="service-icon">
                  {service.icon}
                </div>
              </div>

              <div className="service-card-content">
                <h3>{service.title}</h3>

                <p>{service.text}</p>
              </div>

              <a href="#contact" className="service-link">
                Explore Service
                <span>↗</span>
              </a>

              <div className="service-red-line"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;