Contact.delete_all
Phone.delete_all

bon_jovi = Contact.create(name: 'Bon Jovi', email: 'bon@music.com')
bob_dylon = Contact.create(name: 'Bob Dylon', email: 'bob@music.com')

Phone.create(label: 'Work', number: '111-111-1111', contact_id: bon_jovi.id)
Phone.create(label: 'Home', number: '111-222-2222', contact_id: bon_jovi.id)
Phone.create(label: 'Mobile', number: '222-111-1111', contact_id: bob_dylon.id)
Phone.create(label: 'Home', number: '222-222-2222', contact_id: bob_dylon.id)
