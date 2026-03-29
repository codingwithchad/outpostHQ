import React, { useState } from 'react';
import { CheckCircle, AlertCircle, MapPin, Wifi, Power, Coffee, Users, Clock } from 'lucide-react';

export default function SummitMobileLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Using Formspree for free form handling (no backend needed)
      const response = await fetch('https://formspree.io/f/mbjqwbzw', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Unable to submit. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background-tertiary)' }}>
      {/* HEADER / HERO */}
      <div style={{
        backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        borderBottom: '1px solid var(--color-border-tertiary)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '44px',
            fontWeight: 500,
            marginBottom: '16px',
            color: 'var(--color-text-primary)'
          }}>
            Summit Mobile
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'var(--color-text-secondary)',
            marginBottom: '24px',
            lineHeight: 1.6
          }}>
            Emergency business continuity + on-demand mobile workspace. Get your team productive when it matters most.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)'
            }}>
              45-minute emergency response
            </div>
            <div style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)'
            }}>
              Full-stack workspace for 8-10 people
            </div>
            <div style={{
              padding: '12px 20px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)'
            }}>
              Now serving Seattle area
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        {/* THE PROBLEM */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 500,
            marginBottom: '32px',
            color: 'var(--color-text-primary)'
          }}>
            What happens when your office goes down?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {/* Scenario 1 */}
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--color-border-tertiary)'
            }}>
              <AlertCircle size={28} style={{ color: 'var(--color-text-warning)', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Power failure at 9am
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                Lights out. Internet down. Your 50-person team stops working. You send them home and wait.
              </p>
            </div>

            {/* Scenario 2 */}
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--color-border-tertiary)'
            }}>
              <AlertCircle size={28} style={{ color: 'var(--color-text-warning)', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Network outage
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                Your ISP goes down. Your critical team can't reach servers. You lose $10k per hour in productivity.
              </p>
            </div>

            {/* Scenario 3 */}
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--color-border-tertiary)'
            }}>
              <AlertCircle size={28} style={{ color: 'var(--color-text-warning)', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Building emergency
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                HVAC fails. Fire alarm goes off. You evacuate. Your team has nowhere to go.
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic'
          }}>
            Most companies don't have a continuity plan until it's too late.
          </p>
        </section>

        {/* THE SOLUTION */}
        <section style={{
          padding: '40px',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--color-border-tertiary)',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 500,
            marginBottom: '32px',
            color: 'var(--color-text-primary)'
          }}>
            Summit Mobile shows up in 45 minutes.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {/* Power */}
            <div>
              <Power size={32} style={{ color: '#fbbf24', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Full power
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                800Ah lithium battery. 10kW inverter. Charge laptops, monitors, everything. Climate control included.
              </p>
            </div>

            {/* Internet */}
            <div>
              <Wifi size={32} style={{ color: '#60a5fa', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Redundant connectivity
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                Starlink + 5G failover. Download speeds that work. No excuses.
              </p>
            </div>

            {/* Workspace */}
            <div>
              <Users size={32} style={{ color: '#4ade80', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Comfortable seating
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                8-10 people. Ergonomic swivel chairs. Proper desks. This isn't a cargo van.
              </p>
            </div>

            {/* Coffee */}
            <div>
              <Coffee size={32} style={{ color: '#f97316', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Catering included
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                Fresh coffee. Snacks. Meals can be arranged. You focus on work, we handle the rest.
              </p>
            </div>

            {/* Support */}
            <div>
              <Clock size={32} style={{ color: '#ec4899', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                On-site support
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                A human who knows how to fix things. Wifi issues? Power problems? We handle it.
              </p>
            </div>

            {/* Flexibility */}
            <div>
              <MapPin size={32} style={{ color: '#a78bfa', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Come to you
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6
              }}>
                We deploy to your location. Your office parking lot. Your preferred site. Your rules.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING & USE CASES */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 500,
            marginBottom: '32px',
            color: 'var(--color-text-primary)'
          }}>
            How it works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {/* Emergency Response */}
            <div style={{
              padding: '28px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '2px solid var(--color-border-tertiary)'
            }}>
              <AlertCircle size={24} style={{ color: '#ef4444', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Emergency Response
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                lineHeight: 1.6
              }}>
                Power failure? Network down? Call us.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--color-background-primary)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 4px 0'
                }}>
                  $2,500
                </p>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0
                }}>
                  Flat rate • 4+ hour minimum
                </p>
              </div>
              <ul style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                paddingLeft: '20px'
              }}>
                <li>45-minute deployment</li>
                <li>Full workspace for 8-10 people</li>
                <li>Power + internet + catering</li>
                <li>Support staff on-site</li>
              </ul>
            </div>

            {/* Day Rate */}
            <div style={{
              padding: '28px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '2px solid var(--color-border-tertiary)'
            }}>
              <MapPin size={24} style={{ color: '#3b82f6', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Offsite Day Rate
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                lineHeight: 1.6
              }}>
                Team retreat at Mt. Rainier, Snoqualmie, or your choice.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--color-background-primary)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 4px 0'
                }}>
                  $1,500
                </p>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0
                }}>
                  Per day
                </p>
              </div>
              <ul style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                paddingLeft: '20px'
              }}>
                <li>Transport to scenic location</li>
                <li>Workspace with all amenities</li>
                <li>Optional outdoor break time</li>
                <li>Return transport included</li>
              </ul>
            </div>

            {/* Standby */}
            <div style={{
              padding: '28px',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '2px solid var(--color-border-tertiary)'
            }}>
              <Clock size={24} style={{ color: '#8b5cf6', marginBottom: '12px' }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 500,
                marginBottom: '12px',
                color: 'var(--color-text-primary)'
              }}>
                Monthly Standby
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                lineHeight: 1.6
              }}>
                Peace of mind. We're on-call for your emergencies.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: 'var(--color-background-primary)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '16px'
              }}>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 4px 0'
                }}>
                  $4,000
                </p>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0
                }}>
                  Per month
                </p>
              </div>
              <ul style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
                paddingLeft: '20px'
              }}>
                <li>Guaranteed 30-min response</li>
                <li>Covers unlimited deployments</li>
                <li>Priority booking for offsites</li>
                <li>Annual commitment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA / WAITLIST */}
        <section style={{
          padding: '60px 40px',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--color-border-tertiary)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 500,
            marginBottom: '16px',
            color: 'var(--color-text-primary)'
          }}>
            Limited launch capacity available
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            We're launching in Seattle this spring. Get early access and priority booking for your first deployment.
          </p>

          {submitted ? (
            <div style={{
              maxWidth: '400px',
              margin: '0 auto',
              padding: '24px',
              backgroundColor: 'var(--color-background-primary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '2px solid var(--color-border-tertiary)',
              textAlign: 'center'
            }}>
              <CheckCircle size={40} style={{
                color: '#10b981',
                margin: '0 auto 12px'
              }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                marginBottom: '8px'
              }}>
                You're on the list!
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: 0
              }}>
                We'll reach out in the next 2 weeks with launch details and early pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '16px',
                    border: '1px solid var(--color-border-secondary)',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: 'var(--color-background-primary)',
                    color: 'var(--color-text-primary)',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '16px',
                  fontWeight: 500,
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                {loading ? 'Joining...' : 'Get early access'}
              </button>

              {error && (
                <p style={{
                  fontSize: '14px',
                  color: '#ef4444',
                  marginTop: '12px',
                  margin: '12px 0 0 0'
                }}>
                  {error}
                </p>
              )}
            </form>
          )}
        </section>
      </div>

      {/* FOOTER */}
      <div style={{
        padding: '40px 20px',
        borderTop: '1px solid var(--color-border-tertiary)',
        textAlign: 'center',
        color: 'var(--color-text-secondary)'
      }}>
        <p style={{ fontSize: '14px', margin: '0 0 8px 0' }}>
          Summit Mobile • Business Continuity on Wheels
        </p>
        <p style={{ fontSize: '13px', margin: 0 }}>
          Serving Seattle and surrounding areas. Launching spring 2026.
        </p>
      </div>
    </div>
  );
}
