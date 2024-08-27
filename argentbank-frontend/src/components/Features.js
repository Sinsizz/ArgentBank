import React from 'react';
import FeatureItem from './FeatureItem';
import iconChat from '../asset/img/icon-chat.png';
import iconMoney from '../asset/img/icon-money.png';
import iconSecurity from '../asset/img/icon-security.png';

function Features() {
  const featuresData = [
    {
      icon: iconChat,
      title: "You are our #1 priority",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
      icon: iconMoney,
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be!"
    },
    {
      icon: iconSecurity,
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe."
    }
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </section>
  );
}

export default Features;