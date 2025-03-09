
export function ImpactSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-primary">5000+</p>
              <p className="text-sm text-gray-500 mt-2">Talents</p>
            </div>
            <div className="text-center p-4 border-y md:border-y-0 md:border-x border-gray-200">
              <p className="text-3xl font-bold text-primary">2400+</p>
              <p className="text-sm text-gray-500 mt-2">Projects</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-500 mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
