example url = /api/things

collection.fetch => GET to /api/things *ie #index*

model.fetch => GET to /api/thing/:id *ie #show*

model.save (when model has NO id) => POST to /api/things *ie #create*
model.save (when model already has id) => PUT to /api/things/:id *ie #update*

model.destroy => DELETE to /api/things/:id *ie #destroy*
